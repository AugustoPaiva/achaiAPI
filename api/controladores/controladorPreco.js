const modelos = require('../../config/config.js');
const Grafo = require('node-dijkstra');
var Dijkstra = require('dijkstra-edsger');


class ControladorPreco{
    constructor(){
        this.preco = modelos.produto;
        this.distancia = modelos.distancia;
        this.mercadosProximos = [];
        this.supermercado = modelos.supermercado;
    }

    

    //função pra pegar o preco de um produto em um supermercado, mas por algum motivo o retorno buga
    retornaPreco(produto,supermercado){
        return this.distancia.sequelize.query(
            "SELECT preco " +
            "FROM precos " +
            "WHERE id_produto = '"+produto+"' " +
            "AND id_supermercado = '"+supermercado+"'")
        .then( valor => {
            return valor[0];
        });
    }

    calcularDistancia(body){
        let lat1 = body.lat1;
        let lon1 = body.lon1;
        let lat2 = body.lat2;
        let lon2 = body.lon2;
        const raioTerra = 6371;

        let dlon = this.emRadianos(lon2-lon1);
        let dlat = this.emRadianos(lat2-lat1);

        let a = Math.sin(dlat/2) * Math.sin(dlat/2) 
              + Math.cos(this.emRadianos(lat1)) * Math.cos(this.emRadianos(lat2))
              * Math.sin(dlon/2) * Math.sin(dlon/2);
        let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        let distancia = raioTerra * c;
        return distancia;
    }

    emRadianos(coord){
        return coord * Math.PI /180

    }

    mergeSort(arr){
        
        var len = arr.length;
        if(len <2)
           return arr;
        var mid = Math.floor(len/2),
            left = arr.slice(0,mid),
            right =arr.slice(mid);
        //send left and right to the mergeSort to broke it down into pieces
        //then merge those
        
        return this.merge(this.mergeSort(left),this.mergeSort(right));
     }
    merge(left, right){
        
        var result = [],
            lLen = left.length,
            rLen = right.length,
            l = 0,
            r = 0;
        while(l < lLen && r < rLen){
           if(left[l][2] < right[r][2]){
             result.push(left[l++]);
           }
           else{
             result.push(right[r++]);
          }
        }  
        //remaining part needs to be addred to the result
        
        return result.concat(left.slice(l)).concat(right.slice(r));
      }
         
    retornaMercados(dado){
        this.supermercado.sequelize.query('Select latitude, longitude from enderecos as A inner join supermercados as B on A.id = id_endereco')
        .then(resultado => this.ajustaDados(resultado[0],dado))
        .catch(erro => erro);
        return(this.mercadosProximos);
    }  

    ajustaDados(resultado,dado){
       let mercadosPerto = [];
       let teste = [];
       for (let i = 0; i<14;i++){ //14 é o numero total de supermercados
            teste.push([resultado[i].latitude,resultado[i].longitude]);
       }
       for (let i=0;i<14;i++){
            let valor = this.calcularDistancia({
                                            lat1 : teste[i][0],
                                            lon1 : teste[i][1],
                                            lat2 : dado.lat,
                                            lon2: dado.long
                                        });
            console.log(valor)
            teste[i].push(valor);
       }

       let mercadosOrdem = this.mergeSort(teste);
       mercadosPerto.push(mercadosOrdem[0],mercadosOrdem[1],mercadosOrdem[2],mercadosOrdem[3],mercadosOrdem[4]);
       
       this.pergarSupermercado(mercadosPerto);
       return this.mercadosProximos;
     }

     pergarSupermercado(mercado){
         for(let i=0; i<5;i++){
            this.supermercado.sequelize.query('Select SM.id from supermercados as SM inner join enderecos as E on SM.id_endereco = E.id' +
                                               ' where latitude = "' + mercado[i][0] + '" and longitude = "' + mercado[i][1] + '"')
                                               .then(resposta => this.adicionarValor((resposta[0][0].id).toString()));
            

            
         }
     }

    adicionarValor(dado){
          this.mercadosProximos.push(dado);
          //return(this.mercadosProximos);
          return this.mercadosProximos;
    }
} 
module.exports = ControladorPreco;
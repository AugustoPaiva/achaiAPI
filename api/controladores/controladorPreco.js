const modelos = require('../../config/config.js');
const Grafo = require('node-dijkstra');
var Dijkstra = require('dijkstra-edsger');
const Combinatorics = require('js-combinatorics');


class ControladorPreco{
    constructor(){
        this.preco = modelos.produto;
        this.distancia = modelos.distancia;
        this.mercadosProximos = [];
        this.supermercado = modelos.supermercado;
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

    retornaMercadosProximos(dados){
        return this.supermercado.sequelize.query(
            "SELECT B.id, A.latitude, A.longitude "+
            "FROM enderecos as A "+
            "INNER JOIN supermercados as B "+
            "ON A.id = id_endereco",
        { type: modelos.Sequelize.QueryTypes.SELECT})
        .then(resultado => {
            let distancias = this.calcularDistancias(resultado,dados);
            return distancias;
        });
    }  

    calcularDistancias(coordenadas,destino){
        let distancias = [];
        coordenadas.forEach(supermercado => {
            let dados = {
                            lat1: parseFloat(supermercado.latitude),
                            lon1: parseFloat(supermercado.longitude),
                            lat2: destino.lat,
                            lon2: destino.long
                        }
            let distancia = this.calcularDistancia(dados)
            distancias.push([supermercado.id,distancia])
        });
        distancias = distancias.sort(function (a,b) {
            return a[1]-b[1]
        });
        return distancias.slice(0,3);
    }   


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

    calcularPrecos(dados){ 

        let mercadosProximos;
        let supermercados = [];
        let produtos = [];
        let precos= [];

        return this.retornaMercadosProximos(dados.destino)
        .then(ordem => {
            mercadosProximos = ordem;
            mercadosProximos.forEach(mercado => {
                supermercados.push(mercado[0])
            });
            dados.lista.forEach(produto => {
                produtos.push(produto.id);
            });
            
            let combinacoes = Combinatorics.baseN(supermercados,15).toArray();
            
            return combinacoes;
        });

    }


    /* teste
        let produtos = [6,1,10]; //id dos produtos
        let supermercados = [1,3,5]; //id dos supermercados

        // aqui ele calcula todas as combinações entre supermercados e produtos
        // EX: a combinação [3,1,3] quer dizer que:
        // o produto 6 e o 10 vão ser comprados no supermercado 3 e o produto 1 no supermercado 1
        let combinacoes = Combinatorics.baseN(supermercados,3).toArray();

        //aqui pra cada combinação possivel ele separa os supermercados envolvidos
        //EX: se a combinação for [1,1,5] os supermercados envolvidos serão [1,5]
        combinacoes.forEach(combinacao => {
            //capturava o valor, mas bugou o valor
            let valorcomb = []
            for(let i = 0; i < produtos.length; i++){
                controladorPreco.retornaPreco(produtos[i], combinacoes[0][i])
                .then( valor => {
                    valorcomb.push(valor);
                })
            }
            console.log(valorcomb);
            

            let estabelecimentosEnvolvidos = [];
            combinacao.forEach(supermercado => {
                if (!estabelecimentosEnvolvidos.includes(supermercado)){
                    estabelecimentosEnvolvidos.push(supermercado)
                }
            });
            let rotasPossiveis = Combinatorics.permutationCombination(estabelecimentosEnvolvidos).toArray();
            let melhorRota;
            let valormelhorRota;
            rotasPossiveis.forEach(rota => {
                
            });
        });*/




    /*
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

    mergeSort(arr){
        var len = arr.length;
        if(len <2)
           return arr;
        var mid = Math.floor(len/2),
            left = arr.slice(0,mid),
            right =arr.slice(mid);
        //send left and right to the mergeSort to broke it down into pieces
        //then merge those
        return th.is.merge(this.mergeSort(left),this.mergeSort(right));
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
    */

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
         
} 
module.exports = ControladorPreco;
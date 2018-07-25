const modelos = require('../../config/config.js');
const Grafo = require('node-dijkstra');
var Dijkstra = require('dijkstra-edsger');


class ControladorPreco{
    constructor(){
        this.preco = modelos.produto;
        this.distancia = modelos.distancia;
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
        console.log(distancia)
    }

    emRadianos(coord){
        return coord * Math.PI /180

    }

} 
module.exports = ControladorPreco;
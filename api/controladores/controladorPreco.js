const modelos = require('../../config/config.js');

class ControladorPreco{
    constructor(){
        this.preco = modelos.produto;
        this.distancia = modelos.distancia;
    }

    /*
    calcularDistancia(){
        let lat1 = -8.014426;
        let long1 = -34.950439;
        let lat2 = -8.134777;
        let long2 = -34.907123;
        let dlon = long2-long1;
        let dlat = lat2-lat1;
        console.log(dlon);
        console.log(dlat);
        
        let a = (Math.pow(Math.sin(dlat/2),2)) + Math.cos(lat1) * Math.cos(lat2) * (Math.pow(Math.cos(dlon/2)))
        //console.log(Math.sin(dlat/2))
        let c = 2 * (Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))
        let d = 6371 * c; 
        console.log(d)
        return d;
    }*/

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
//rural = -8.014426, -34,950439
//talarico's house = -8-134777,-34,907123
//14,2
module.exports = ControladorPreco;
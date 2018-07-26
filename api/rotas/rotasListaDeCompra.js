const ControladorListaDeCompra = require('../controladores/controladorListaDeCompra');
const ControladorPreco = require('../controladores/controladorPreco');



module.exports = function(app){
    const controladorListaDeCompra = new ControladorListaDeCompra();
    const controladorPreco = new ControladorPreco();

    
    app.get('/listaDeCompra/:id_cliente', (req,res) =>{
        controladorListaDeCompra.listasPorCliente(req.params)
        .then((resposta)=> {
            res.status(200).send(resposta);
        });
    });

    
    app.get('/listaDeProdutos/lista/:id', (req, res) => {
        controladorListaDeCompra.retornarLista(req.params)
        .then(resposta => {
            res.send(resposta);
        });
    });

    app.post('/listaDeCompra', (req,res) => {
        controladorListaDeCompra.criarLista(req.body)
        .then(resposta => {
            res.send(resposta);
        });
    });

    app.post('/listaDeCompra/adicionar', (req,res) => {
        controladorListaDeCompra.adicionarProduto(req.body)
        .then(resposta => {
            res.send(resposta);
        });
    });

    app.post('/teste', (req,res) => {
        let body  = {
            destino:{"lat":-8.134777,"long":-34.907123},
            lista: [
                {"id":1,"nome":"arroz branco 1kg","marca":"camil","imagem":null,"codBarras":"123456789"},
                {"id":18,"nome":"peixe congelado 1kg","marca":"qualitá","imagem":null,"codBarras":"123456789"},
                {"id":9,"nome":"maminha 1kg","marca":"friboi","imagem":null,"codBarras":"123456789"},
                {"id":33,"nome":"café em pó 500g","marca":"3 corações","imagem":null,"codBarras":"123456789"},
                {"id":24,"nome":"bolacha salgada 400g","marca":"marilan","imagem":null,"codBarras":"123456789"},
                {"id":27,"nome":"açucar 1kg","marca":"união","imagem":null,"codBarras":"123456789"},
                {"id":12,"nome":"picanha 1kg","marca":"saudali","imagem":null,"codBarras":"123456789"},
                {"id":6,"nome":"feijão carioca 1kg","marca":"namorado","imagem":null,"codBarras":"123456789"},
                {"id":30,"nome":"adoçante 100ml","marca":"adocyl","imagem":null,"codBarras":"123456789"}
            ]
        }
        controladorPreco.calcularPrecos(body)
        .then(resposta => {
            res.send(resposta);
        });
        
        

    });
}
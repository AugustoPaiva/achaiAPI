const ControladorListaDeCompra = require('../controladores/controladorListaDeCompra');
const ControladorPreco = require('../controladores/controladorPreco');

const Combinatorics = require('js-combinatorics');

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

    app.get('/teste', (req,res) => {
        return controladorPreco.retornaMercados({
            lat:-8.134777,
            long:-34.907123
        })
        .then(resposta => {
            res.send(resposta);
        });
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

    });
}
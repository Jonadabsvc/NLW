import express, { response } from 'express'

const app = express()

/* HTTP Codes => ler docs "http status code MDN"
status iniciando com 2 = sucesso
status iniciando com 3 = redirecionamento
status iniciando com 4 = erros gerados pela aplicação
status iniciando com 5 = erros inesperados
*/

app.get('/games', (request, response) => {
    return response.json([]);
});

/* rota para criar anuncio
possui o mesmo nome de recurso /ads
porem com metodos diferentes (post) */
app.post('/ads', (request, response) => {
    return response.status(201).json([]);
});

/* rota para listar anuncios
de um game especifico*/
app.get('/games/:id/ads', (request, response) => {
    // const gameId = request.params.id;

    return response.json([
        { id: 1, name: "Anuncio 1" },
        { id: 2, name: "Anuncio 2" },
        { id: 3, name: "Anuncio 3" },
        { id: 4, name: "Anuncio 4" },
    ])
})

app.get('/games/:id/discord', (request, response) => {
    // const adId = request.params.id;
    
    return response.json([])
})


app.listen(3333)
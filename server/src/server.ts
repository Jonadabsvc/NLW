import express, { response } from 'express'
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';

const app = express()

app.use(express.json())

const prisma = new PrismaClient({
    log: ['query']
})

/* HTTP Codes => ler docs "http status code MDN"
status iniciando com 2 = sucesso
status iniciando com 3 = redirecionamento
status iniciando com 4 = erros gerados pela aplicação
status iniciando com 5 = erros inesperados
*/

app.get('/games', async (request, response) => {
    //lista games
    const games = await prisma.game.findMany({
        include: { //inner join com a tabela ads
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
});

/* rota para criar anuncio
possui o mesmo nome de recurso /ads
porem com metodos diferentes (post) */
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    // fazer validação da entrada de dados com biblioteca Zod

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
});

/* rota para listar anuncios
de um game especifico*/
app.get('/games/:id/ads', async (request, response) => {
    //lista anuncio por game
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }))
})

app.get('/games/:id/discord', async(request, response) => {
    //lista discord por anuncio
    const adId = request.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord,
    })
})


app.listen(3333)
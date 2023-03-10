import { GameController, MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from "react";

import { GameBanner } from "./components/GameBanner";

import './styles/main.css';
// Componentes / Propriedades

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Input } from "./components/Form/input";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  /*  a variavel games é um array de objetos
    que tem o formato definido na interface Game*/
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      {/*
          w-full é width 100%
          pt-16 é padding top 64 pixels, 64/4 = 16
          pb-4  é padding bottom 16 pixels, 16/4 = 4
          px-4  é padding lateral 16 pixels, 16/4 = 4
      */}
      <div className="grid grid-cols-6 gap-6 mt-16"> {/* div dos jogos */}
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form className="mt-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar" />
              </div>

              <div>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div>
                <div>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                </div>
                <div>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div>
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div>
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer>
                <button>Cancelar</button>
                <button type="submit">
                  <GameController />
                  Encontrar duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )

}

export default App

import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from "react";

import { GameBanner } from "./components/GameBanner";

import './styles/main.css';
// Componentes / Propriedades

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from "./components/CreateAdBanner";

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
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

          <Dialog.Content>
            <Dialog.Title>Publique um anúncio</Dialog.Title>

            <Dialog.Content>
              texto qualquer
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )

}

export default App

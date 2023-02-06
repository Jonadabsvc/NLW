import {MagnifyingGlassPlus} from "phosphor-react"
import { GameBanner } from "./components/GameBanner";
import './styles/main.css';
// Componentes / Propriedades

import logoImg from './assets/logo-nlw-esports.svg';


function App() {
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

      <GameBanner bannerUrl="/game-1.png" title="League of Legends" adsCount={4}/>
      <GameBanner bannerUrl="/game-2.png" title="Dota 2" adsCount={2}/>
      <GameBanner bannerUrl="/game-3.png" title="CS:GO" adsCount={5}/>
      <GameBanner bannerUrl="/game-4.png" title="Apex Legends" adsCount={3}/>
      <GameBanner bannerUrl="/game-5.png" title="Fortnite" adsCount={2}/>
      <GameBanner bannerUrl="/game-6.png" title="World of Warcraft" adsCount={2}/>

      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </button>
        </div>
      </div>

    </div>
  )

}

export default App

"use client";

import { useEffect, useState } from "react";
import { City, ICity } from "./components/atoms/city";
import { Input } from "./components/atoms/input";
import { Title } from "./components/atoms/title";
import { ListCities } from "./components/molecules/list-items";
import { getDistance } from "./service/getDistance";

import { FaInfo } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import { Map } from "./components/molecules/map";

import JSConfetti from "js-confetti";
import "react-toastify/dist/ReactToastify.css";
import { useCityStore } from "./store/city";
import { getTimeNow } from "./utils/getTimeNow";

export default function Home() {
  const [lastCity, setLastCity] = useState<ICity | undefined>(undefined);
  const [city, setCity] = useState<string>("");

  const { isDone, done, cities, setCities, date, clear } = useCityStore();

  function toCamelCase(str: string) {
    // Divida a string em palavras
    let palavras = str.toLowerCase().split(" ");
    const ignoreWords = ["de", "da", "do"];

    // Capitalize a primeira letra de cada palavra
    for (let i = 0; i < palavras.length; i++) {
      if (!ignoreWords.includes(palavras[i]))
        palavras[i] =
          palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
    }

    // Junte as palavras novamente
    return palavras.join(" ");
  }

  const handle = (event: any) => {
    const filter = event.target.value;
    setCity(filter);
  };

  const keyDown = (event: any) => {
    if (event.key === "Enter") {
      const sendCity = toCamelCase(city);
      if (cities.find((c) => c.text === sendCity))
        toast.info(`${sendCity} já foi`, {
          position: "top-center",
          theme: "colored",
        });
      else {
        setCity("");
        getDistance(toCamelCase(sendCity))
          .then((res) => {
            setLastCity({ text: sendCity, distance: res });
            setCities({ text: sendCity, distance: res });
            if (res === 0) {
              done();
              const jsConfetti = new JSConfetti();
              jsConfetti.addConfetti();
            }
          })
          .catch((_) => {
            toast.warning(`Cidade ${sendCity} não encontrada`);
          });
      }
    }
  };

  useEffect(() => {
    const today = getTimeNow();
    if (today !== date) clear();
  }, [clear, date]);

  return (
    <main>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="sm:grid sm:grid-cols-2 sm:grid-rows-1 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-col items-center pt-10 h-[50vh] sm:h-screen">
          <div className="px-4 group relative self-start">
            <FaInfo />
            <div className="relative">
              <div className="hidden group-hover:flex absolute justify-center">
                <div className="w-60 bg-stone-900 p-4 flex flex-col items-center ">
                  <h1 className="font-black text-lg">Como Jogar?</h1>
                  <ul className="flex flex-col gap-4">
                    <li className="text-sm">
                      Descubra a cidade do dia. Teste quantas vezes você quiser
                    </li>
                    <li className="text-sm">
                      Algumas cidades por terem nomes duplicados, foram removidas,
                      logo use esse conhecimento como estrateǵia
                    </li>
                    <li className="text-sm">
                      A pontuação é dada em Kilometros (KM)
                    </li>
                    <li className="text-sm">
                      Apenas as três primeiras cidades são destacadas
                    </li>
                    <li className="text-sm">
                      Clique no map para gerar marcadores
                    </li>
                  </ul>
                </div>
            </div>
            </div>
          </div>
          <Title />
          <Input
            value={city}
            onChange={handle}
            onKeyDown={keyDown}
            disabled={isDone}
          />
          <div className="p-4">
            {lastCity && (
              <City
                text={lastCity.text}
                distance={lastCity.distance}
                position="last"
              />
            )}
          </div>
          <ListCities cities={cities} />
        </div>
        <div className="w-screen h-[48vh] sm:w-[50vw] sm:h-screen">
          <Map className="w-screen h-[50vh] sm:w-[50vw] sm:h-screen" />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

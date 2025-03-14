'use client';

import { getPokemonDetail } from "@/api/getPokemonDetail";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  key: string;
  name: string;
  attack?: number;
  defense?: number;
  url?: string;
}

const Card = ({ name, attack = 0, defense = 0, url }: Props) => {
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const pokemonDetail = await getPokemonDetail({ urlPokemon: url });
      setPokemonDetail(pokemonDetail);
    }

    if (!!url) {
      fetchPokemonDetail();
    }

  }, [url]);
  const idPokemon: any = url?.split('/')[6];
  const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`;

  return (
    <div className="border-2 border-gray-300 p-4 text-center">
      <Image
        className="w-full h-40 mb-10"
        src={urlImage}
        alt={name}
        width={100}
        height={100}
      />

      <h2 className="text-lg font-bold">Pokemon Name</h2>
      <p>{name}</p>

      <h2 className="text-lg font-bold">{pokemonDetail?.nameAttack}</h2>
      <p>{pokemonDetail?.levelAttack}</p>

      <h2 className="text-lg font-bold">{pokemonDetail?.nameDefense}</h2>
      <p>{pokemonDetail?.levelDefense}</p>
    </div>
  )
}

export default Card;

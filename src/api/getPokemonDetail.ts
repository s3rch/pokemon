import { notFound } from "next/navigation";

interface Props {
  urlPokemon: string;
}

interface dataReturn {
  nameAttack: string;
  levelAttack: number;
  nameDefense: string;
  levelDefense: number;
}

export const getPokemonDetail = async ({ urlPokemon }: Props): Promise<dataReturn> => {

  const res = await fetch(urlPokemon);

  if (!res.ok) {
    throw new Error("Internal error fetching");
  }

  const data = await res.json();

  if (!data) {
    notFound();
  }

  return {
    nameAttack: data.stats[1].stat.name,
    levelAttack: data.stats[1].base_stat,
    nameDefense: data.stats[2].stat.name,
    levelDefense: data.stats[2].base_stat,
  };
}

import { notFound } from "next/navigation";

interface Props {
  limit?: number;
  offset?: number;
}

interface dataReturn {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const getPokemonList = async ({ limit = 20, offset = 0 }: Props): Promise<dataReturn> => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Internal error fetching");
  }

  const data = await res.json();

  if (!data.results) {
    notFound();
  }

  return data;
}

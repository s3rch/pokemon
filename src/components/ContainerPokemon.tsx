'use client';

import { useEffect, useState } from "react";
import { getPokemonList } from "@/api/getPokemonList";
import Card from "./Card";
import Pagination from "./Pagination";

interface Pokemon {
  name: string;
  url: string;
}

const ContainerPokemon = () => {
  const [pokemonListNew, setPokemonListNew] = useState<Pokemon[]>([]);
  const [originalPokemonList, setOriginalPokemonList] = useState<Pokemon[]>([]);
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const limit = 20;

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  }

  const handleChangeOrder = () => {
    if (order === 'DESC') {
      setPokemonListNew([...pokemonListNew].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      console.log('ASC');
      setPokemonListNew([...pokemonListNew].sort((a, b) => b.name.localeCompare(a.name)));
    }
  }

  const fetchPokemonData = async (pageNum: number) => {
    const offset = (pageNum - 1) * limit;
    const pokemonList = await getPokemonList({ limit, offset });
    setPokemonListNew(pokemonList.results);
    setOriginalPokemonList(pokemonList.results);
    setHasNextPage(!!pokemonList.next);
    setHasPrevPage(!!pokemonList.previous);
  }

  useEffect(() => {
    fetchPokemonData(page);
  }, [page]);

  useEffect(() => {
    handleChangeOrder();
  }, [order]);

  const goToNextPage = () => {
    if (hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (hasPrevPage) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-10 px-4">
        <div className="col-span-1 md:col-span-3 flex">
          <label className="mr-2">Buscar por nombre: </label>
          <input
            type="text"
            placeholder="Nombre del pokemon"
            className="border border-gray-300 px-3 py-1 rounded w-full"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              if (searchTerm === '') {
                setPokemonListNew(originalPokemonList)
              } else {
                setPokemonListNew(originalPokemonList.filter((pokemon: Pokemon) =>
                  pokemon.name.toLowerCase().includes(searchTerm)
                ));
              }
            }}
          />
        </div>

        <div className="col-span-1 flex">
          <label>Ordenar por: </label>
          <select
            onChange={handleChangeSelect}
            value={order}
            className="border border-gray-300 px-3 py-1 rounded w-full"
          >
            <option value="ASC">A - Z</option>
            <option value="DESC">Z - A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {pokemonListNew.map(({ name, url }) => (
          <Card
            key={name}
            name={name}
            url={url}
          />
        ))}
      </div>

      <Pagination
        goToPrevPage={goToPrevPage}
        hasPrevPage={hasPrevPage}
        goToNextPage={goToNextPage}
        hasNextPage={hasNextPage}
        page={page}
      />
    </>
  )
}
export default ContainerPokemon;

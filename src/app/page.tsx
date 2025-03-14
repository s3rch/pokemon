import { getPokemonList } from "@/api/getPokemonList";
import ContainerPokemon from "@/components/ContainerPokemon";

export default async function Home() {
  return (
    <>
      <header>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold py-5">Pokemon</h1>
        </div>
      </header>
      <main>
        <div className="container mx-auto">
          <ContainerPokemon />
        </div>
      </main>
    </>
  );
}

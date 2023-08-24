import { $, component$} from "@builder.io/qwik";
import {  useNavigate , type DocumentHead } from "@builder.io/qwik-city";
import {PokemonImage}  from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();
  const {pokemonId, isBackImage, isVisible, nextPokemon, prevPokemon, toogleFromBack, toogleVisible} = usePokemonGame();
  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <span class="text-5xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={async () => await goToPokemon()}>
        <PokemonImage id={pokemonId.value} backimage={isBackImage.value} visible={isVisible.value} />
      </div>
      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={toogleVisible} class="btn btn-primary">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primera app en Qwik",
    },
  ],
};

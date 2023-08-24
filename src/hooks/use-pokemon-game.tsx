import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context/pokemon";


export const usePokemonGame = () => {
    const pokemonGame = useContext(PokemonGameContext);
    const changePokemonId = $((value: number) => 
    {
        if(pokemonGame.pokemonId + value <= 0) return;
        pokemonGame.pokemonId += value      
    });
    const toogleFromBack = $(() => {
        pokemonGame.isBackImage = !pokemonGame.isBackImage 
    });
    const toogleVisible = $(() => {
        pokemonGame.isVisible = !pokemonGame.isVisible 
    });

    return {
        pokemonId     : useComputed$(()=>{return pokemonGame.pokemonId}),
        isBackImage   : useComputed$(()=>{return pokemonGame.isBackImage}),
        isVisible     : useComputed$(()=>{return pokemonGame.isVisible}),
        nextPokemon   : $(() => changePokemonId(+1)),
        prevPokemon   : $(() => changePokemonId(-1)),
        toogleFromBack: toogleFromBack,
        toogleVisible : toogleVisible 
    }
}
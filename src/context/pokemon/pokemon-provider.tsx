import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';
import { PokemonGameContext,  PokemonListContext} from './';
import type { PokemonGameState, PokemonListState } from "./";

export const PokemonProvider = component$(() => {
    const pokemongame = useStore<PokemonGameState>({
        pokemonId: 1,
        isVisible: true,
        isBackImage: false
    });
    const pokemonlist = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        isLast: false,
        pokemons: []
    });

    useContextProvider(PokemonGameContext, pokemongame);
    useContextProvider(PokemonListContext, pokemonlist);
    return (
        <Slot />
    )
});
import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState{
    pokemonId: number;
    isBackImage: boolean;
    isVisible: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon-game-context');
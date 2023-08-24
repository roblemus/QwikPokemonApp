import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const UsePokemonId = routeLoader$<number>(({params, redirect}) => {
    const id = Number(params.id);
    if(isNaN(id)) redirect(301, '/');
    if(id<=0 || id>1000) redirect(303, '/');
    return id;
});

export default component$(() => {
    const pokemonId = UsePokemonId();
    //const pokemonGame = useContext(PokemonGameContext);
    const { isBackImage, isVisible, toogleFromBack, toogleVisible} = usePokemonGame();
    return(        
        <>
            <span class="text-5xl">Pokemon: {pokemonId.value}</span>
            <PokemonImage id={pokemonId.value} backimage={isBackImage.value} visible={isVisible.value} />
            <div class="mt-2">
                <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={toogleVisible} class="btn btn-primary">Revelar</button>
            </div>
        </>
    )
});
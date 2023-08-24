import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonListContext } from '~/context/pokemon/pokemon-list-context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

/*import type { SmallPokemon } from '~/interfaces';
interface PokemonState{
    currentPage: number;
    isLoading: boolean;
    isLast: boolean;
    pokemons: SmallPokemon[];
}*/

export default component$(() => {
    /*const pokemonStore = useStore<PokemonState>({
        currentPage: 0,
        isLoading: false,
        isLast: false,
        pokemons: []
    });*/
    const pokemonStore = useContext(PokemonListContext);

    useTask$( async ({track}) =>{
        track(()=> pokemonStore.currentPage);
        const pokemons = await getSmallPokemons(pokemonStore.currentPage * 36, 36);
        pokemonStore.isLoading = false;        
        console.log(pokemons.length > 0 ? '' : 'Ya no hay');        
        pokemonStore.isLast = pokemons.length > 0 ? false : true;        
        pokemonStore.pokemons = pokemons.length > 0 ?  [...pokemonStore.pokemons, ...pokemons] : pokemonStore.pokemons;
        
    });

    useOnDocument('scroll', $(() => {
        if(!pokemonStore.isLast){
            const maxScroll = document.body.scrollHeight;
            const currentScroll = window.scrollY + window.innerHeight;
            if((maxScroll - currentScroll) <= 1 && !pokemonStore.isLoading){
                pokemonStore.isLoading = true;
                pokemonStore.currentPage++;
                console.log(pokemonStore.currentPage);
                        
            }else
                console.log('Negada');
        }
            
    }));

    return <>
    <div class="flex flex-col">
        <span class="my-5 text-xl5">Status</span>
        <span>Pagina Actual: {pokemonStore.currentPage}</span>
        <span>Cargando Pagina... {pokemonStore.isLoading ? 'SI' : 'NO'}</span>
    </div>
    <div class="mt-10">
        {/*<button 
            class={`btn btn-primary mr-2 `}
            onClick$={() => pokemonStore.currentPage--}   
>Anteriores</button>*/}
        <button 
        class={`btn btn-primary mr-2` }
        onClick$={() => pokemonStore.currentPage++}
        >Siguientes</button>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 grid-cols-6 mt-5">
        {            
            pokemonStore.pokemons.map(({name, id}) => (
                <div key={name} class="m-5 flex flex-col justify-center items-center">
                    <PokemonImage id={id} />
                    <span class="capitalize">{name}</span>
                </div>
            ))
        }            
    </div>        
    
</>
});
export const head: DocumentHead = {
    title: "Cliente",   
};
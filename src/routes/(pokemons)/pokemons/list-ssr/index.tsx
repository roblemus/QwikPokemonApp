import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { Modal } from '~/components/shared';
import { getChatGPTResponse } from '~/helpers/get-chatgpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname}) => {
    const offset = Number(query.get('offset') || '0')    
    const sPath = pathname; 
    if(isNaN(offset)) redirect(301, sPath);
    if(offset < 0) redirect(301, sPath);
    return await getSmallPokemons(offset);

});

export default component$<number>(() => {
    const pokemons = usePokemonList();
    const location = useLocation();
    const modalVisible = useSignal(false);
    const pokemonModal = useStore({
        pokemonId: '1',
        pokemonName: '',
        pokemonDescrip: ''
    });
    const showModal = $((id: string, name: string) =>{        
        pokemonModal.pokemonId = id;
        pokemonModal.pokemonName = name;  
        modalVisible.value = true;
    });

    const closeModal = $(() =>{
        modalVisible.value = false;
    });
    const currentOffset = useComputed$ (() =>{
        //const offSetString = location.url.searchParams.get('offset');
        const offSetString = new URLSearchParams(location.url.search);
        return Number(offSetString.get('offset') || 0);

    });
    useVisibleTask$(({ track }) => {
        track(()=> pokemonModal.pokemonName);
        pokemonModal.pokemonDescrip = '';
        if(pokemonModal.pokemonName.length > 0){
            getChatGPTResponse(pokemonModal.pokemonId)
            .then(
                (resp) => pokemonModal.pokemonDescrip = resp
            );
        }
    });
    
    return <>
        <div class="flex flex-col">
            <span class="my-5 text-xl5">Status</span>
            <span>Offset: {currentOffset}</span>
            <span>Cargando Pagina... {location.isNavigating ? 'SI' : 'NO'}</span>
        </div>
        <div class="mt-10">
            <Link
            href={`/pokemons/list-ssr/?offset=${currentOffset.value - 12}`}
            class={`btn btn-primary mr-2 visibility: ${currentOffset.value===0 ? 'hidden' : 'visible'}`}>Anteriores</Link>
            <Link 
            href={`/pokemons/list-ssr/?offset=${currentOffset.value + 12}`} 
            class={`btn btn-primary mr-2`}
            >Siguientes</Link>
        </div>
        <div class="grid grid-cols-6 mt-5">
            {
                pokemons.value.map(({name, id}) => (
                    <div
                        onClick$={() => showModal(id, name)} 
                        key={name} class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage id={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))
            }            
        </div>
        <Modal showModal={modalVisible.value} closeModal={closeModal} persistent size='lg'>
            <span q:slot='title'>{pokemonModal.pokemonName}</span>
            <div q:slot='content' class='flex flex-col justify-center items-center'>
                <PokemonImage  id={pokemonModal.pokemonId} />
                <span>{
                pokemonModal.pokemonDescrip === ''
                ? 'Consultando'
                : pokemonModal.pokemonDescrip}</span>
            </div>
        </Modal>
    </>
});

export const head: DocumentHead = {
    title: "SSR",
};
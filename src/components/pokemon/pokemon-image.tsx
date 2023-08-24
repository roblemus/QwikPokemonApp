import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik"

interface Props{
    id: number | string;
    size?: number;
    backimage?: boolean;
    visible?: boolean;
}


export const PokemonImage = component$(({id, size=200,  backimage=false, visible=true }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({track}) => {
        track(() => id);
        imageLoaded.value = false;
    });
    const imgUrl = useComputed$(() => {
        if(id==='') return '';
        let origen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
        origen += (backimage) ? `/back/${id}.png` : `${id}.png`
        return origen;

    })
    return(
        <div 
            class="flex items-center justify-center"
            style={{width: `${size}px`, height: `${size}px`}} >
        { !imageLoaded.value && <span> CARGANDO...</span>}
        <img width="96" height="96"
            src={imgUrl.value} 
            alt="Pokemon Sprite"
            style={{width: `${size}px`}}
            onLoad$={() => {
                //setTimeout(()=>{
                    imageLoaded.value = true;
                //}, 1000)
            } }
            class={{
                'hidden': !imageLoaded.value,
                'brightness-0': !visible
            }}
        />
        </div>
    )
});
import { PropFunction, Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props{
    showModal: boolean;    
    closeModal: PropFunction<() => void>
    persistent?: boolean,
    size?: 'sm' | 'md' | 'lg'
}

export const Modal = component$( ({showModal, closeModal, persistent=false, size='lg'}:Props) => {

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div
            id="div-externo"
            onClick$={(event) => {
                const elementID = (event.target as HTMLElement).id;
                if(elementID === "div-externo" && !persistent) closeModal();
            }}
            class={showModal ? "modal-background" : "hidden"}>
            {/*const long = size==='sm' ? 'modal-sm' : (size==='md' ? 'modal-lg' : 'modal-lg')
            <div class={`modal-content  ${size==='sm' ? 'modal-sm' : (size==='md' ? 'modal-md' : 'modal-lg') }`}>
            <div class={['modal-content', `model-${size}`]}>
            */}
            <div class={`modal-content  ${size==='sm' ? 'modal-sm' : (size==='md' ? 'modal-md' : 'modal-lg') }`}>
                <div class="mt-3 text-center">                    
                    <h3 class="modal-title"><Slot name='title'/></h3>
                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content'/>
                        </div>
                    </div>
                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button"
                            onClick$={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>                                        
                </div>
            </div>
        </div>
    )
});
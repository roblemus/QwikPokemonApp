import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {
    const {valor, increase, decrease} = useCounter(12);

    return (
        <>
            <span class="text-2xl">Counter</span>
            <span class="text-5xl">{valor.value}</span>
            <div class="mt-3">
                <button onClick$={() => {
                    decrease()
                }} class="btn btn-primary mr-2">-1</button>
                <button onClick$={() => {
                    increase()
                }}  class="btn btn-primary mr-2">+1</button>
            </div>
        </>
    )

});
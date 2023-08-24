import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initial: number) => {
    const counter = useSignal(initial);
    const increaseCounter = $(() =>{
        counter.value++;
    });

    const decreaseCounter = $(() =>{
        counter.value--;
    });

    return { 
        valor: useComputed$(() => counter.value),
        decrease: decreaseCounter, 
        increase: increaseCounter};
}
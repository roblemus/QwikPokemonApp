import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useCheckAuthCookie = routeLoader$(({cookie, redirect})=>{
    const jwtCookie = cookie.get('jwt');
    if(jwtCookie){
        console.log('Cookie Valida', jwtCookie);
        return;
    }
    redirect(302, '/login');        
})

export default component$(() => {
    return(
        <div class="flex flex-col justify-center items-center mt-10">
            <h3>Layout DashBoard</h3>
            <Slot/>
        </div>
    )
});
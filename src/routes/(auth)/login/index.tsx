import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, Link, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserActions = routeAction$((data, {cookie, redirect})=>{
    const {email, password } = data;
    if(email==='rllr.money@gmail.com' && password==='123456'){
        cookie.set('jwt', 'Mi JWT', {secure: true, path:'/'});
        redirect(302, '/');
        return {
            success: true,
            jwt: 'Mi JWT'
        }
    }else
        var resp = (email==='rllr.money@gmail.com') ? 'Contraseña incorrecta' : 'Email Incorrecto';
        return{
            success: false,
            respuesta: resp
        }

}, zod$(
    {
        email: z.string().email('Formano no valido'),
        password: z.string().min(6, 'Minimo 6 letras').nonempty('No puede ser vacio')
    }
)
)

export default component$(() => {
    useStylesScoped$(styles);
    const action = useLoginUserActions();
    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input
                name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button>Ingresar</button>                
            </div>
            <div class="relative">
                <Link href='/' class="flex flex-col justify-center">Regresar</Link>
            </div>
            {(action.value?.fieldErrors?.email && <p class='not-valid'>Error Email: {action.value?.fieldErrors?.email}</p>)}
            {(action.value?.fieldErrors?.password && <p class='not-valid'>Error Password: {action.value?.fieldErrors?.password}</p>)}
            {(action.value?.success===false && <p class='not-valid'>{action.value?.respuesta}</p>)}
            {/* <code>
                { JSON.stringify( action.value, undefined , 2 ) }
    </code> */}
        </Form>
    )
});
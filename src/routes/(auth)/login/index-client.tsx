import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import styles from './login.css?inline';


export default component$(() => {
    useStylesScoped$(styles);
    const formState = useStore({
        email: '',
        password: '',
        postState: false
    })
    const validEmail = useComputed$(()=>{
        if(formState.email.includes('@')) return '';
        return 'not-valid'
    })
    const validPassword = useComputed$(()=>{
        if(formState.password.length > 0) return '';
        return 'not-valid'
    })
    const isFormValid = useComputed$(()=>{
        if(validEmail.value==='' && validPassword.value==='') return true;
        return false;        
    })
    const onSubmit = $(() => {
        formState.postState = true;   
        const {email, password} = formState;
        console.log({email, password});             
        console.log({'Form Valid': isFormValid.value});        
    })

    return (
        <form class="login-form" preventdefault:submit onSubmit$={onSubmit}>
            <div class="relative">
                <input
                class={formState.postState ? validEmail.value : ''}
                onInput$={(ev) => formState.email = (ev.target as HTMLInputElement).value} 
                name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                class={formState.postState ? validPassword.value : ''}
                onInput$={(ev) => formState.password = (ev.target as HTMLInputElement).value} 
                name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button disabled={!isFormValid.value}>Ingresar</button>                
            </div>
            <div class="relative">
                <Link href='/' class="flex flex-col justify-center">Regresar</Link>
            </div>


            { <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code> }
        </form>
    )
});
import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
          {/*<button onClick$={() => nav('/')}>About</button>*/}
        </div>
        <div>
          <ul>
            <li><Link href="/login/">Login</Link></li>
            <li><Link href="/dashboard/">DashBoard</Link></li>          
            <li><Link href="/pokemons/list-ssr/">SSR</Link></li>
            <li><Link href="/pokemons/list-client/">Cliente</Link></li>
            <li><Link href="/counter/">Counter</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
});

<main>
    <div class="login-popup">
        <form class="login-form">
            <label for="login">Usuario</label>
            <input type="text" name="login" id="login" placeholder="Usuario" bind:value={user} required>
            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="Contraseña">
            <button type="submit" on:click={doLogin}>Iniciar sesión</button>
        </form>
    </div>
</main>

<script lang="ts">
import { login } from "$lib/stores/session.js";

let user = "";
let password = "";

const doLogin = async (e: Event) => {
    e.preventDefault();
    const body = {
        user: user,
        password: password,
    };

    const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        login();
    }
};
</script>
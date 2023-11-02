<main>
    <h1>Congreso TryIt</h1>
    <div class="header-links">
        <a href="/">Inicio</a>
        <a href="/entradas">entradas</a>
        <a href="/horarios">horarios</a>
        { #if $sessionStatusStore.loginStatus }
            <button class="login-button" on:click={logout}>Logout</button>
        {:else}
            <button class="login-button" on:click={showLoginPopUp}>Login</button>
        {/if}
        { #if $sessionStatusStore.showPopUp }
            <LoginPopUp />
        {/if}
    </div>
</main>

<script lang="ts">
import {sessionStatusStore, logout, showLoginPopUp} from '$lib/stores/session.ts';
import LoginPopUp from "$lib/LoginPopUp.svelte";
</script>
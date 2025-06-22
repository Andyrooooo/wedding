<script lang="ts">
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    let error = '';
    let isLoading = false

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleLogin() {
        isLoading = true
        error = '';
        await delay(1000)
        const res = await fetch('login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            isLoading = false
            goto('/admin');
        } else {
            error = data.error || 'Login failed';
            isLoading = false
        }
    }
</script>

<a class="absolute top-4 left-4 px-4 py-2 rounded-md bg-black/80 hover:bg-black rounded-md shadow-lg border border-white/10 transition-all duration-300 font-bold text-white flex items-center font-proper" href="/"><i class="fa-solid fa-circle-chevron-left mr-2 text-3xl"></i>Go Home</a>


<div class="w-full h-screen flex justify-center items-center max-w-md mx-auto">
    <div class="bg-white shadow-lg border border-black/20 m-4 rounded-2xl">
        <div class="py-4 bg-black rounded-t-2xl">
            <p class="text-center text-white font-bold font-proper">Admin Login</p>
        </div>

        <div class="px-4 {error ? 'pb-4 pt-8' : 'py-8'}">
            <input bind:value={username} type="text" placeholder="Username" class=" border-black/20 border-t-0 border-l-0 border-r-0 px-4 py-2 mb-4 w-full focus:outline-none focus:ring-0 focus:border-black"/>
            <input bind:value={password} type="password" placeholder="Password" class=" border-black/20 border-t-0 border-l-0 border-r-0 px-4 py-2 mb-4 w-full focus:outline-none focus:ring-0 focus:border-black"/>
            {#if error}
                <div class="text-red-600 mt-2 text-center">{error}</div>
            {/if}
        </div>

        <div class="bg-black rounded-b-2xl px-4">
            <button on:click={handleLogin} class="my-4 px-4 py-2 rounded-md bg-white/80 rounded-2xl shadow-lg border border-black/10 hover:bg-white transition-all duration-300 font-bold w-full font-proper">Login <a class="{isLoading ? '' : 'hidden'} fa-solid fa-circle-notch animate-spin ml-1"></a></button>
        </div>
    </div>
</div>
 

<style>
:global(body[data-theme="wedding"]) {
    background-color: #EFEFEF !important; /* Replace with your color */
}

input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:hover,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #000 !important;
}
</style>
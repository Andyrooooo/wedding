<script lang="ts">
    import Home from './home/+page.svelte';
    import {onMount} from 'svelte';
    import { fly } from 'svelte/transition';

    let loading = false;
    let intro = false

    onMount(() => {
        // Check if animation has already played
        if (sessionStorage.getItem('introPlayed')) {
            loading = false;
        } else {
            loading = true
            setTimeout(() => {
                intro = true;
            }, 500);

            // When animation finishes, set the flag
            setTimeout(() => {
                loading = false;
                sessionStorage.setItem('introPlayed', 'true');
            }, 2000); // Adjust to your animation duration
        }
    });
</script>

<div>
    {#if loading}
        <div 
        out:fly={{ x: -window.innerWidth, duration: 600, opacity: 1 }}
        class="fixed z-50 top-0 left-0 w-full h-full bg-white flex items-center justify-center">
            <div 
            class:translate-y-0={intro}
            class:translate-y-20={!intro}
            class:opacity-0={!intro}
            class:opacity-100={intro}
            class="transition-all duration-1000">
                <img src="intro.svg" alt="Wedding Icon" class="h-full w-full rounded-2xl shadow-2xl"/>
            </div>
        </div>

    {:else}
        <Home />
    {/if}
</div>

<!-- <style>
    /* Hide scrollbars */
    .scroll-container::-webkit-scrollbar {
        display: none;
    }
    .scroll-container {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style> -->
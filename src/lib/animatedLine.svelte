<script lang="ts">
    import { onMount } from 'svelte';
    export let height = 'h-24'; // Tailwind height class, default to h-24 (6rem)
    export let color = 'bg-zinc-300'; // Tailwind color class
    export let delay = 'delay-0'; // Tailwind delay class
    export let duration = 'duration-1000'; // Tailwind duration class
    let visible = false;
    let lineRef: HTMLDivElement | null = null;

    onMount(() => {
        if (!lineRef) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    visible = true;
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(lineRef);
        return () => observer.disconnect();
    });
</script>

<div class="flex justify-center h-24 w-full">
    <div
        bind:this={lineRef}
        class={`my-12 w-1 rounded-full transition-all ${duration} ${delay} ${color} ${visible ? height : 'h-0'}`}
    ></div>
</div>
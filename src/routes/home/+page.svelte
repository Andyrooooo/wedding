<script lang="ts">
    import Nav from '../nav/+page.svelte';
</script>

<Nav />

<div class="h-screen relative">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[1]"></div>
    <img src="homeHero3.png" alt="Drew and Emma at the lake in colorado" class="relative z-[2] h-full object-cover w-full opacity-50"/>

    <div class="absolute bottom-[6rem] left-0 w-full z-[3] text-5xl text-center">
        <h1 class="font-cursive mb-20">Drew & Emma</h1>
        <h2 class="font-proper">Are Getting Married</h2>
    </div>
</div>
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    let hamburgerHovered = false
    let hamburgerOpened = false
    import { page } from '$app/stores';
    $: currentPath = $page.url.pathname;
    $: isLoggedIn = $page.data.isLoggedIn

    // Close menu if resizing to desktop width
    function handleResize() {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024 && hamburgerOpened) {
            hamburgerOpened = false;
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }
    });
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
        }
    });
</script>


<!-- background -->
<div class="fixed top-0 left-0 w-full z-[10]">
    <!-- navigation bar -->
    <div class="m-4 p-4 bg-black/40 rounded-2xl backdrop-blur-lg shadow-lg border border-white/20 xl:mx-auto max-w-[1200px]">
        <!-- regular menu -->
        <div class="flex justify-between">
            <a href="/" class="bg-beige rounded-md hover:bg-beige/40 transition-all duration-500 cursor-pointer">
                <img src="weddingIcon2.png" alt="Wedding Icon" class="h-[35px] w-[55px] rounded-md"/>
            </a>
        
            <div
            on:click={() => hamburgerOpened = !hamburgerOpened}
            on:mouseover={() => hamburgerHovered = true}
            on:mouseout={() => hamburgerHovered = false}
            class="w-[40px] h-[35px] {hamburgerHovered ? 'hover:bg-black/30' : ''} rounded-md transition-all duration-300 p-1.5 flex flex-col justify-between items-stretch lg:hidden cursor-pointer">
                <div class="bg-white h-1 w-full rounded-full {hamburgerOpened ? '-rotate-45 translate-y-[9.5px]' : ''} transition-all duration-300"></div>
                <div class="bg-white h-1 {hamburgerHovered ? 'w-full' : 'w-4/6'} rounded-full ml-auto transition-all duration-300 {hamburgerOpened ? 'opacity-0' : 'opacity-100'} "></div>
                <div class="bg-white h-1 w-full rounded-full {hamburgerOpened ? 'rotate-45 -translate-y-[9.5px]' : ''} transition-all duration-300"></div>
            </div>

            <div class="hidden lg:flex gap-4 items-center font-proper text-white">
                
                <div class="">
                    <a href="/" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Home</a>
                </div>
                <div class="">
                    <a href="/rsvp" class="py-2 px-4 text-light-rust hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">RSVP</a>
                </div>
                <div>
                    <a href="/tbd" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">The Big Day</a>
                </div>
                <div>
                    <a href="/registry" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Registry</a>
                </div>
                <div>
                    <a href="/faqs" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">FAQs</a>
                </div>
                <div>
                    <a href="memories" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Our Memories</a>
                </div>

                <div class="h-full w-[2px] bg-white/20 rounded-full"></div>
                
                <div>
                    {#if currentPath.startsWith('/admin')}
                        <a href="/logout" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Logout</a>
                    {:else if isLoggedIn}
                        <a href="/logout" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Logout</a>
                    {:else}
                        <a href="/login" class="py-2 px-4 hover:bg-black/30 rounded-md transition-all duration-300 cursor-pointer">Login</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- mobile menu when its opened -->
<!-- {hamburgerOpened ? 'w-full' : 'w-0'} -->
<div 
class:w-full={hamburgerOpened}
class:translate-x-0={hamburgerOpened}
class="w-0 transform -translate-x-20 fixed top-0 left-0 h-full z-[9] bg-black/50 backdrop-blur-lg transition-all duration-500 font-proper">
    <div class="mt-28 flex flex-col items-center gap-2 text-white">
        <a href="/"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-500={hamburgerOpened}
        >
            <div class="p-4 hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a >Home</a>
            </div>
        </a>

        <a href="/rsvp"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-600={hamburgerOpened}>
            <div class="p-4 text-light-rust hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a>RSVP</a>
            </div>
        </a>

        <a href="/tbd"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-600={hamburgerOpened}>
            <div class="p-4 hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a>The Big Day</a>
            </div>
        </a>
    
        <a href="/registry"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-700={hamburgerOpened}>
            <div class="p-4 hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a>Registry</a>
            </div>
        </a>
        
        <a href="/faqs"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-800={hamburgerOpened}>
            <div class="p-4 hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a>FAQs</a>
            </div>
        </a>
    
        <a href="/memories"
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-900={hamburgerOpened}
        >
            <div class="p-4 hover:bg-black/75 text-center transition-all duration-300 cursor-pointer">
                <a>Our Memories</a>
            </div>
        </a>
    
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-1000={hamburgerOpened}
        >
            {#if currentPath.startsWith('/admin')}
            <a href="/logout" class="p-4 hover:bg-black/75 w-full flex justify-center transition-all duration-300 cursor-pointer">
                <p class="">logout</p>
            </a>
            {:else if isLoggedIn}
                <a href="/logout" class="p-4 hover:bg-black/75 w-full flex justify-center transition-all duration-300 cursor-pointer">
                    <p class="">logout</p>
                </a>
            {:else}
                <a href="/login" class="p-4 hover:bg-black/75 w-full flex justify-center transition-all duration-300 cursor-pointer">
                    <p class="">login</p>
                </a>
            {/if}
        </div>
    </div>
</div>
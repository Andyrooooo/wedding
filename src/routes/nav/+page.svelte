<script lang="ts">
    let hamburgerHovered = false
    let hamburgerOpened = false
</script>


<!-- background -->
<div class="absolute top-0 left-0 w-full z-[10]">
    <!-- navigation bar -->
    <div class="m-4 p-4 bg-white/40 rounded-2xl backdrop-blur-md shadow-lg">
        <div class="flex justify-between">
            <a class="bg-beige rounded-md hover:bg-beige/40 transition-all duration-500">
                <img src="weddingIcon2.png" alt="Wedding Icon" class="h-[35px] w-[55px] rounded-md"/>
            </a>
        
            <div
            on:click={() => hamburgerOpened = !hamburgerOpened}
            on:mouseover={() => hamburgerHovered = true}
            on:mouseout={() => hamburgerHovered = false}
            class="w-[40px] h-[35px] {hamburgerHovered ? 'bg-rust/40' : ''} rounded-md transition-all duration-300 p-1.5 flex flex-col justify-between items-stretch">
                <div class="bg-white h-1 w-full rounded-full {hamburgerOpened ? '-rotate-45 translate-y-[9.5px]' : ''} transition-all duration-300"></div>
                <div class="bg-white h-1 {hamburgerHovered ? 'w-full' : 'w-4/6'} rounded-full ml-auto transition-all duration-300 {hamburgerOpened ? 'opacity-0' : 'opacity-100'} "></div>
                <div class="bg-white h-1 w-full rounded-full {hamburgerOpened ? 'rotate-45 -translate-y-[9.5px]' : ''} transition-all duration-300"></div>
            </div>
        </div>
    </div>
</div>

<!-- {hamburgerOpened ? 'w-full' : 'w-0'} -->
<div class="fixed top-0 left-0 {hamburgerOpened ? 'w-full' : 'w-0'} h-full z-[9] bg-white/20 backdrop-blur-md transition-all duration-500 font-proper">
    <div class="mt-28 flex flex-col items-center gap-2">
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-500={hamburgerOpened}>
            <div class="p-4 hover:bg-white/40 hover:text-rust text-center transition-all duration-300 cursor-pointer">
                <a>The Big Day</a>
            </div>
        </div>
    
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-600={hamburgerOpened}>
            <div class="p-4 hover:bg-white/40 hover:text-rust text-center transition-all duration-300 cursor-pointer">
                <a>Travel</a>
            </div>
        </div>
        
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-700={hamburgerOpened}>
            <div class="p-4 hover:bg-white/40 hover:text-rust w-full text-center transition-all duration-300 cursor-pointer">
                <a>FAQs</a>
            </div>
        </div>
    
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-800={hamburgerOpened}
        >
            <div class="p-4 hover:bg-white/40 hover:text-rust w-full text-center transition-all duration-300 cursor-pointer">
                <a>Our Memories</a>
            </div>
        </div>
    
        <div
        class=" transform opacity-0 -translate-y-4 transition-all duration-300 w-full"
        class:opacity-100={hamburgerOpened}
        class:translate-y-0={hamburgerOpened}
        class:delay-900={hamburgerOpened}
        >
            <div class="p-4 hover:bg-white/40 hover:text-rust w-full text-center transition-all duration-300 cursor-pointer">
                <a>Login</a>
            </div>
        </div>
    </div>
</div>
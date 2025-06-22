<script lang="ts">
    import Nav from '../nav/+page.svelte'
import AnimatedLine from '../../lib/animatedLine.svelte';
</script>





<Nav />

<!-- hero section -->
<div class="h-screen relative  overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-40"></div>
    <img src="registry-hero.jpg" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-proper relative z-[2]">Our Registry</h1>
        </div>
    </div>
</div>

<AnimatedLine height="h-24" color="bg-zinc-300" delay="delay-0" duration="duration-1000" />

<section class="mt-20 font-proper mx-auto max-w-[1200px] w-4/5">
    <div class="p-4 bg-rust/40 border border-rust/20 rounded-md mb-8 text-white text-lg shadow-md">
        <p class="mb-2">We feel fortunate to have built a life together filled with love & many of the things we need. As we look to the future, we are saving for a home to call our own.</p>
        <p>Should you wish to give a gift, a contribution toward our house fund would be deeply appreciated <i class="fa-solid fa-heart text-red-600"></i></p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 items-start">
        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-gift text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4 text-center">Registry</h2>
            <p class="text-white/60 mb-4">Here is where you can find our Amazon registry items:</p>
            
            <a href="https://www.amazon.com/wedding/organize-registry?ref_=list_d_gl_lfu_nav" target="_blank" class="w-full text-center px-4 py-2 rounded-md bg-black/80 shadow-lg border border-white/10 hover:bg-black transition-all duration-300 font-bold text-white">Registry</a>
        </div>


        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-dollar-sign text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4 text-center">Emma's Venmo</h2>
            <p class="text-white/60 mb-4">If you would like to donate money to us, this is Emma's Venmo:</p>
            
            <a href="https://account.venmo.com/u/walkeremma" target="_blank" class="w-full text-center px-4 py-2 rounded-md bg-black/80 shadow-lg border border-white/10 hover:bg-black transition-all duration-300 font-bold text-white">Venmo</a>
        </div>


        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-dollar-sign text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4 text-center">Drew's Venmo</h2>
            <p class="text-white/60 mb-4">If you would like to donate money to us, this is Drew's Venmo:</p>
            
            <a href="https://account.venmo.com/u/Andrew-Kester-2" target="_blank" class="w-full text-center px-4 py-2 rounded-md bg-black/80 shadow-lg border border-white/10 hover:bg-black transition-all duration-300 font-bold text-white">Venmo</a>
        </div>


        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-dollar-sign text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4 text-center">Zelle</h2>
            <p class="text-white/60 mb-4">If your not able to use Venmo you can donate through Zelle:</p>
            <p class="text-white/60 mb-4">Zelle is sent through your banking app and you will send it to Emma's number: <a class="text-white font-bold">(714) 862-4760</a></p>
            <div></div>
        </div>
        
    </div>
</section>





<style>
:global(body[data-theme="wedding"]) {
    background-color: #EFEFEF !important; /* Replace with your color */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>
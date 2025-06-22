<script lang="ts">
    import Nav from '../nav/+page.svelte'
    import AnimatedLine from '../../lib/animatedLine.svelte';
</script>





<Nav />

<!-- hero section -->
<div class="h-screen relative  overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-40"></div>
    <img src="faqs-hero.png" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-proper relative z-[2]">FAQs</h1>
        </div>
    </div>
</div>

<AnimatedLine height="h-24" color="bg-zinc-300" delay="delay-0" duration="duration-1000" />

<section class="mt-20 mx-auto max-w-[1200px] w-4/5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8 items-start">
        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">What should I wear?</h2>
            <p class="text-white/60 mb-2">We kindly ask our guests to dress in semi-formal attire inspired by earth tones. Think warm, grounded colors like terracotta, olive, taupe, rust, sage, copper, or deep browns and greens.</p>
            <p class="text-white/60 mb-2">For women, cocktail dresses, flowy skirts, or tailored jumpsuits are perfect. For men, dress shirts with slacks or suits <a class="font-bold text-white">no need for a full tux</a> are ideal. Ties are optional, but polished shoes are encouraged.</p>
            <p class="text-white/60">Let nature inspire your look—elegant, comfortable, and in harmony with the earthy palette we love.</p>
        </div>

        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">What kind of food will be provided?</h2>

            <p class="text-white/60">We’ll have a taco truck with all the fixings, plus chips, salsa, guac, and bean dip. Save room for dessert—we’re serving ice cream!</p>
        </div>

        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">Will there be an open bar?</h2>

            <p class="text-white/60">Yes! We’ll have an open bar with beer, wine, seltzers, and two signature cocktails: a Whiskey Sour and a Moscow Mule. Cheers</p>
        </div>


        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">Are children invited?</h2>

            <p class="text-white/60">We adore your kids, but due to space limitations, we’re only able to invite a few special little guests. If your children are invited, their names will be listed on your invitation.</p>
        </div>

        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">Is there parking at the venue?</h2>

            <p class="text-white/60">Yes—free parking is available at the venue. No need to worry about finding a spot!</p>
        </div>

        <div class="grid bg-black/40 rounded-md border border-white/20 p-4 text-white">
            <div class="flex items-center justify-center mb-4">
                <i class="fa-solid fa-circle-question text-3xl"></i>
            </div>

            <h2 class="text-3xl font-proper font-bold mb-4">Can I bring a plus one?</h2>

            <p class="text-white/60">Due to limited space, we are only able to accommodate those listed on your invitation. We hope you understand!</p>
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
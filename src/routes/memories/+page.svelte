<script lang="ts">
    import Nav from '../nav/+page.svelte'

</script>





<Nav />

<!-- hero section -->
<div class="h-screen relative  overflow-hidden mb-20">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[1]"></div>
    <img src="memories_hero.png" alt="Emma at the National Park Beach" class="relative z-[2] h-full object-cover w-full opacity-50" loading="lazy"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-proper relative z-[2]">Our Memories</h1>
        </div>
    </div>
</div>



<!-- Arches -->
<div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Arches National Park</a> - Oct 2020</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full" src="arches/1.webp" />
            </div>
        </div>
         <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full" src="arches/2.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full" src="arches/3.webp" alt="" />
            </div>
        </div>
    </section>
</div>



<!-- Yellowstone -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Yellowstone National Park</a> - Jun 2021</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-3  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/2.webp" alt="" />
            </div>
            
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="yellowstone/6.webp" alt="" />
            </div>
        </div>

    </section>
</div>



<!-- yosemite -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Yosemite + Sequoia National Park</a> - August 2021</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="yosemite/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="yosemite/2.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="sequoia/1.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="sequoia/2.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="sequoia/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="sequoia/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="yosemite/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="yosemite/4.webp" alt="" />
            </div>
        </div>

    </section>
</div>



<!-- Joshua tree -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Joshua Tree National Park</a> - Jun 2022</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-3  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/2.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="joshua/6.webp" alt="" />
            </div>
        </div>

    </section>
</div>




<!-- Bryce Canyon -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Bryce Canyon National Park</a> - Aug 2022</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/2.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/6.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/7.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="bryce/8.webp" alt="" />
            </div>
        </div>
    </section>
</div>





<!-- rocky mountain -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Rocky Mountain National Park</a> - Oct 2022</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/2.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/6.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/7.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/8.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/9.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/10.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/11.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/12.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/13.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/14.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/15.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/16.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/17.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/18.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/19.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="rocky/20.webp" alt="" />
            </div>
        </div>
    </section>
</div>



<!-- Guadalupe mountains, carlesbad caverns, white sands -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">White Sands + Guadalupe Mountains + Carlsbad Caverns</a> - May 2023</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="white/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="white/2.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="white/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="white/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="guadalupe/1.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="guadalupe/2.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="guadalupe/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="guadalupe/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto md:h-full max-w-full object-cover" src="carlesbad/1.webp" alt="" />
            </div>
            <div>
                <img class="h-auto md:h-full max-w-full object-cover" src="carlesbad/2.webp" alt="" />
            </div>
        </div>
    </section>
</div>




<!-- capitol reef -->
 <div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Capitol Reef National Park</a> - July 2023</p>
    </div>
    <section class="grid grid-cols-2 gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="capitol/1.webp" />
            </div>
            <div class="">
                <img class="h-auto max-w-full object-cover" src="capitol/2.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div class="">
                <img class="h-auto max-w-full object-cover" src="capitol/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="capitol/4.webp" alt="" />
            </div>
        </div>
    </section>
</div>



<!-- Hawaii -->
<div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Volcanoes National Park</a> - Oct 2024</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/2.webp" alt="" />
            </div>
            
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/6.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/7.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/8.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/9.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/10.webp" alt="" />
            </div>
        </div>

        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/11.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="hawaii/12.webp" alt="" />
            </div>
        </div>

    </section>
</div>




<!-- Save the Date -->
<div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Save the Date Photos <i class="fa-solid fa-heart text-red-500"></i></a> - Nov 2024</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/2.webp" alt="" />
            </div>
            
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/6.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/7.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/8.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/9.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/10.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="std/11.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="std/12.webp" alt="" />
            </div>
        </div>
    </section>
</div>



<!-- Wedding invites -->
<div class="font-proper mb-20">
    <div class="w-full flex justify-start mb-2 pl-4">
        <p class="bg-black rounded-full px-4 py-2 font-proper text-white border border-zinc-500/20 shadow-lg text-xs" ><a class="font-semibold">Wedding Invites <i class="fa-solid fa-heart text-red-500"></i></a> - Jun 2024</p>
    </div>
    <section class="grid grid-cols-2 md:grid-cols-4  gap-2">
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/1.webp" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/2.webp" alt="" />
            </div>

        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/3.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/4.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/5.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/6.webp" alt="" />
            </div>
        </div>
        <div class="grid gap-2">
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/7.webp" alt="" />
            </div>
            <div>
                <img class="h-auto max-w-full object-cover" src="wi/8.webp" alt="" />
            </div>
        </div>
    </section>
</div>






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
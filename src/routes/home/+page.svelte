<script lang="ts">
    import Nav from '../nav/+page.svelte';
    import AnimatedLine from '../../lib/animatedLine.svelte';
    import { onMount } from 'svelte';
    let intro = false
    let introRef: HTMLDivElement | null = null;
    let countdown = false
    let countdownRef: HTMLDivElement | null = null;
    let rsvp = false
    let rsvpRef: HTMLDivElement | null = null;
    let storyIntro = false
    let storyIntroRef: HTMLDivElement | null = null;
    let photoOne = false
    let photoOneRef: HTMLDivElement | null = null;
    let photoTwo = false
    let photoTwoRef: HTMLDivElement | null = null;
    let photoThree = false
    let photoThreeRef: HTMLDivElement | null = null;
    let photoFour = false
    let photoFourRef: HTMLDivElement | null = null;
    let photoFive = false
    let photoFiveRef: HTMLDivElement | null = null;

    const now = new Date();
    const weddingDate = new Date('2025-10-17');
    const timeDiff = weddingDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    function observeOnce(refGetter: () => HTMLElement | null, setter: (v: boolean) => void, threshold = 0.3) {
        let observer: IntersectionObserver;
        function start() {
            const ref = refGetter();
            if (ref) {
                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setter(true);
                            observer.disconnect();
                        }
                    },
                    { threshold }
                );
                observer.observe(ref);
            }
        }
        start();
        return () => observer && observer.disconnect();
    }

    onMount(() => {
        const cleanups = [
            observeOnce(() => introRef, v => intro = v),
            observeOnce(() => countdownRef, v => countdown = v),
            observeOnce(() => rsvpRef, v => rsvp = v),
            observeOnce(() => storyIntroRef, v => storyIntro = v),
            observeOnce(() => photoOneRef, v => photoOne = v),
            observeOnce(() => photoTwoRef, v => photoTwo = v),
            observeOnce(() => photoThreeRef, v => photoThree = v),
            observeOnce(() => photoFourRef, v => photoFour = v),
            observeOnce(() => photoFiveRef, v => photoFive = v),
            // Add more: observeOnce(() => anotherRef, v => anotherVar = v)
        ];
        return () => cleanups.forEach(fn => fn());
    });
    
</script>

<Nav />

<!-- hero section -->
<div class="h-screen relative">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-40"></div>
    <img src="homeHero3.png" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    <!-- <img src="homeHero3.png" alt="Drew and Emma at the lake in colorado" class="relative z-[2] h-full object-cover w-full opacity-90"/> -->
    <!-- <video
        src="heroVid6.mp4"
        autoplay
        loop
        muted
        playsinline
        class="relative z-[2] h-full object-cover w-full opacity-90">
    </video> -->

    <!-- <div class="absolute bottom-[6rem] left-0 w-full z-[3] text-5xl text-center">
        <h1 class="font-cursive mb-20">Drew & Emma</h1>
        <h2 class="font-proper">Are Getting Married</h2>
    </div> -->
    <div class="absolute bottom-0 left-0 z-[3] text-5xl lg:text-7xl transition-all duration-300 flex justify-center w-full text-center">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-cursive mb-20 ">Drew & Emma</h1>
            <h2 class="font-proper">Are Getting Married</h2>
        </div>
    </div>
</div>



<!-------------------- details -------------------------->
<!-- <div class="px-4"> -->
<AnimatedLine height="h-24" color="bg-zinc-300" delay="delay-0" duration="duration-1000" />


<!-- intro -->
<div 
    bind:this={introRef}
    class="transform opacity-0 -translate-y-4 transition-all duration-700 delay-300 px-4"
    class:opacity-100={intro}
    class:translate-y-0={intro}
>
    <div class="mt-20">
        <p class="font-cursive text-4xl text-center mb-8 ">You're invited to join us on our big day on</p>
    </div>

    <div>
        <p class="font-proper text-3xl text-center mb-16">October 17, 2025</p>
    </div>
</div>





<!-- Emma & Counter -->
<div 
bind:this={countdownRef}
class="mx-4 mb-16 bg-white rounded-2xl shadow-lg border border-black/10 h-screen md:flex transform opacity-0 -translate-y-4 transition-all duration-700 delay-300 xl:mx-auto max-w-[1200px]"
class:opacity-100={countdown}
class:translate-y-0={countdown}
>
    <div class="h-1/2 w-full md:h-full md:basis-5/12">
        <div class="w-full h-full ">
            <img src="countdown.png" alt="Emma looking over the valley at Yosemite" class="object-cover h-full w-full rounded-2xl"/>
        </div>
    </div>

    <div class="pt-12 px-8 pb-12 h-1/2 w-full md:h-full md:basis-7/12 flex items-center w-full">
        <div class="w-4/5 mx-auto">
            <div class="flex items-center mb-4">
                <div class="w-full h-[2px] bg-zinc-500/20 rounded-full"></div>
                <i class="fa-solid fa-tree text-green text-2xl px-8"></i>
                <div class="w-full h-[2px] bg-zinc-500/20 rounded-full"></div>
            </div>

            <div class="font-proper text-center text-zinc-500/20">
                <p class="text-7xl font-bold text-black">{daysLeft}</p>
                <p class="text-3xl text-zinc-700">Days</p>
            </div>

            <div class="flex items-center mt-4">
                <div class="w-full h-[2px] bg-zinc-500/20 rounded-full"></div>
                <i class="fa-solid fa-tree text-green text-2xl px-8"></i>
                <div class="w-full h-[2px] bg-zinc-500/20 rounded-full"></div>
            </div>
        </div>
    </div>
</div>




<!-- Drew and RSVP -->
<div 
bind:this={rsvpRef}
class="md:h-screen flex flex-col md:flex-row md:gap-4 mx-4 transform opacity-0 -translate-y-4 transition-all duration-700 delay-300  font-proper xl:mx-auto max-w-[1200px]"
class:opacity-100={rsvp}
class:translate-y-0={rsvp}
>
    <div class="md:basis-7/12 md:flex md:items-center">
        <div class="w-full">
            <p class="text-3xl text-center mb-4">Have you RSVP'd yet?</p>

            <div class="hidden w-4/5 md:flex justify-center mx-auto">
                <button class="px-4 py-2 rounded-md bg-black/80 shadow-lg border border-white/10 hover:bg-black transition-all duration-300 font-bold max-w-[768px] w-full text-white">RSVP</button>
            </div>
        </div>
    </div>

    <div class="h-[400px] md:h-full md:basis-5/12">
        <img src="rsvp.png" alt="drew looking through a glass dome" class="h-full object-cover md:w-full mb-4 rounded-2xl aspect-[16/9]"/>
    </div>

    <div class="w-full flex justify-center md:hidden mt-4 w-4/5 mx-auto">
        <button class="px-4 py-2 rounded-md bg-black/80 shadow-lg border border-white/10 hover:bg-black transition-all duration-300 font-bold max-w-[768px] w-full text-white">RSVP</button>
    </div>
</div>

<!-- <div class="w-full flex justify-center">
    <div class="h-24 mb-12 w-1 bg-zinc-500/20 rounded-full"></div>
</div> -->
<div class="">
    <AnimatedLine height="h-24" color="bg-zinc-300" delay="delay-0" duration="duration-1000" />
</div>
<!-- </div> -->


    




<!-- story -->
<div class="mx-4 mt-20 font-proper mb-12 xl:mx-auto max-w-[1200px]">
    

    <h2 
    bind:this={storyIntroRef}
    class="text-4xl text-center mb-12 font-bold transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
    class:opacity-100={storyIntro}
    class:translate-y-0={storyIntro}
    >Our Story</h2>
    <!-- <div class="flex gap-4 w-full justify-center">
        <div class="basis-full"> -->
    <div class="flex gap-4">
        <div class="basis-full">
            <div class="mb-12" >
                <p class="font-bold mb-12 text-center transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
                class:opacity-100={storyIntro}
                class:translate-y-0={storyIntro}
                >Our story starts the way all great love stories do—with an overpacked car and way too many snacks.</p>

                <div 
                bind:this={photoOneRef}
                class="md:flex gap-4 items-center transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
                class:opacity-100={photoOne}
                class:translate-y-0={photoOne}
                >
                    <div class="h-[400px] lg:h-[500px] mb-4 md:w-5/12">
                        <img src="story1.png" alt="Drew and Emma at Arches National Park" class="object-cover opacity-90 h-full w-full rounded-tr-2xl rounded-bl-2xl"/>
                    </div>
                    <!-- <div bind:this={sectionRef0}></div> -->
                     <div class="md:w-7/12">
                        <h3 class="text-3xl font-bold mb-4 text-center">Arches National Park</h3>
                        <p class="w-4/5 mx-auto">What began as a casual trip to Arches National Park quickly turned into a shared mission: to visit as many national parks as possible, one stunning view <a class="font-bold">and one overstuffed suitcase</a> at a time. Neither of us had any idea that somewhere between the scenic overlooks and the Airbnb check-ins, we’d find something even better than perfect photo ops: each other. <i class="fa-solid fa-heart text-red-500"></i><i class="fa-solid fa-tree text-green"></i><i class="fa-solid fa-heart text-red-500"></i></p>
                     </div>
                </div>
            </div>



            <div class="mb-12 ">
                <div 
                bind:this={photoTwoRef}
                class="md:flex gap-4 items-center transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
                class:opacity-100={photoTwo}
                class:translate-y-0={photoTwo}
                >
                    <div class="hidden md:block md:w-7/12 ">
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Yellowstone & Canyonlands</h3>
                        <p  class="w-4/5 mx-auto">From the geysers of Yellowstone to the jaw-dropping cliffs of Canyonlands, every stop brought new adventures—and new packing lessons <a class="font-bold">which we still haven’t learned</a>. We stayed warm and cozy in Airbnbs, filled the fridge with more groceries than a family of six would need, and found joy in the little things—like the post-hike snacks we definitely didn’t earn and the playlists that somehow got us through hours of driving.</p>
                    </div>

                    <div class="grid grid-cols-2 rounded-tr-2xl rounded-bl-2xl mb-4 gap-1 border border-black/20 md:w-5/12">
                        <div class="grid gap-1">
                            <img src="story2.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full"/>
                            <img src="story4.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full  rounded-bl-2xl"/>
                        </div>
                        <div class="grid gap-1">
                            <img src="story6.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full rounded-tr-2xl h-full"/>
                            <img src="story7.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                        </div>
                    </div>
                    <!-- <div bind:this={sectionRef1}></div> -->
                    <div class="md:hidden">
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Yellowstone & Canyonlands</h3>
                        <p  class="w-4/5 mx-auto">From the geysers of Yellowstone to the jaw-dropping cliffs of Canyonlands, every stop brought new adventures—and new packing lessons <a class="font-bold">which we still haven’t learned</a>. We stayed warm and cozy in Airbnbs, filled the fridge with more groceries than a family of six would need, and found joy in the little things—like the post-hike snacks we definitely didn’t earn and the playlists that somehow got us through hours of driving.</p>
                    </div>
                </div>
            </div>
 


            <div class="mb-12">
                <div 
                bind:this={photoThreeRef}
                class="md:flex gap-4 items-center transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
                class:opacity-100={photoThree}
                class:translate-y-0={photoThree}
                >
                    <div class="grid grid-cols-2 rounded-tr-2xl rounded-bl-2xl mb-4 gap-1 border border-black/20 md:w-5/12 ">
                        <div class="grid gap-1">
                            <img src="storysnp.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full"/>
                            <img src="storysnp2.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full  rounded-bl-2xl"/>
                        </div>
                        <div class="grid gap-1">
                            <img src="storybcnp.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full rounded-tr-2xl h-full"/>
                            <img src="storybcnp2.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                        </div>
                    </div>
                    <!-- <div bind:this={sectionRef2}></div> -->
                    <div class="md:w-7/12">
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Yosemite, Sequoia, Joshua Tree, Bryce Canyon</h3>
                        <p  class="w-4/5 mx-auto">Our trip to Yosemite was filled with awe <a class="font-bold">and maybe a few sore legs</a>, and in Sequoia, we stood in total silence beneath trees older than time. We got a bit more boho in Joshua Tree, and switched things up for Bryce Canyon, where we made it a friends trip—equal parts hiking and group selfies.</p>
                    </div>
                </div>
            </div>



            <div class="mb-12">
                <div 
                bind:this={photoFourRef}
                class="md:flex gap-4 items-center transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
                class:opacity-100={photoFour}
                class:translate-y-0={photoFour}
                >
                    <div class="hidden md:block md:w-7/12">
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Rockies, White Sands, Carlesbad, Guadalupe, Capitol Reef</h3>
                        <p  class="w-4/5 mx-auto mb-2">By the time we reached the Rocky Mountains, we had this whole travel rhythm down: one of us drove, the other navigated <a class="font-bold">okay, “navigated” mostly meant giving snack updates</a>, and we both pretended not to notice how many times we repacked the trunk. White Sands, Carlsbad Caverns, and the Guadalupe Mountains added more memories—and more photos we’ll never delete.</p>
                        <p class="w-4/5 mx-auto">Next came Capitol Reef, a park that surprised us with its quiet beauty and wide open spaces—another hidden gem we got to share together.</p>
                    </div>

                    <div class="grid grid-cols-2 rounded-tr-2xl rounded-bl-2xl mb-4 gap-1 border border-black/20 md:w-5/12 h-[400px] lg:h-[500px]">
                        <div class="grid gap-1">
                            <img src="storyrmnp2.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                            <img src="storywsnp.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full rounded-bl-2xl"/>
                        </div>
                        <div class="grid gap-1">
                            <img src="storycbcnp.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full rounded-tr-2xl h-full"/>
                            <img src="storygmnp.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                        </div>
                    </div>
                    <!-- <div bind:this={sectionRef1}></div> -->
                    <div class="md:hidden">    
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Rockies, White Sands, Carlesbad, Guadalupe, Capitol Reef</h3>
                        <p  class="w-4/5 mx-auto mb-2">By the time we reached the Rocky Mountains, we had this whole travel rhythm down: one of us drove, the other navigated <a class="font-bold">okay, “navigated” mostly meant giving snack updates</a>, and we both pretended not to notice how many times we repacked the trunk. White Sands, Carlsbad Caverns, and the Guadalupe Mountains added more memories—and more photos we’ll never delete.</p>
                        <p class="w-4/5 mx-auto">Next came Capitol Reef, a park that surprised us with its quiet beauty and wide open spaces—another hidden gem we got to share together.</p>
                    </div>
                </div>
                <!-- <div bind:this={sectionRef3}></div> -->
            </div>



            <div 
            bind:this={photoFiveRef}
            class=" transform opacity-0 -translate-y-4 transition-all duration-700 delay-300"
            class:opacity-100={photoFive}
            class:translate-y-0={photoFive}>
                <p class="mb-4 font-bold text-center">And then came Hawaii.</p>

                <div class="md:flex gap-4 items-center">
                    <div class="grid grid-cols-2 rounded-tr-2xl rounded-bl-2xl mb-4 gap-1 border border-black/20 md:w-5/12 ">
                        <div class="grid gap-1">
                            <img src="storyhawaii.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                            <img src="storyhawaii2.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full rounded-bl-2xl"/>
                        </div>
                        <div class="grid gap-1">
                            <img src="storyhawaii3.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full rounded-tr-2xl h-full"/>
                            <img src="storyhawaii4.png" alt="Drew and Emma at Arches National Park" class="object-cover w-full h-full"/>
                        </div>
                    </div>
                    <!-- <div bind:this={sectionRef2}></div> -->
                    <div class="md:w-7/12">
                        <h3 class="text-3xl font-bold mb-4 text-center w-4/5 mx-auto">Volcanoes National Park</h3>
                        <div class="w-4/5 mx-auto">
                            <p  class="mb-2">We wrapped up our adventure with a peaceful stay near Hawai‘i Volcanoes National Park, and on our final morning—outside our Airbnb, still sipping coffee and soaking in those island vibes—one of us got down on one knee.</p>
                            <p class="mb-2"><a class="font-bold">Spoiler alert:</a> the other said yes. <i class="fa-solid fa-ring text-yellow-700"></i></p>
                            <p class="">We’ve shared so many miles and moments on this journey, and now we can’t wait to share our next one—with all of you. <i class="fa-solid fa-person"></i><i class="fa-solid fa-person-dress"></i></p>
                        </div>
                    </div>
                </div>

                <!-- <div bind:this={sectionRef4}></div> -->
            </div>
        </div>


        <!-- <div class="w-full relative basis-4">
            <div class="absolute top-0 left-0 w-full flex justify-center transition-all duration-500 delay-200" style="height: {lineHeight}px; ">
                <div class="w-[2px] {atEnd ? 'bg-rust' : 'bg-black/20'} rounded-full mb-8" style="height: 100%;"></div>
            </div>

            Dot at the bottom of the line
            <div
                class="absolute left-0 w-full flex justify-center transition-opacity delay-700 duration-1000"
                style="top: {dotTop - 8}px; opacity: {dotOpacity};"
            >
                <div class="h-2 w-2 {atEnd ? 'bg-rust' : 'bg-black'} rounded-full animate-ping"></div>
            </div>
            <div
                class="absolute left-0 w-full flex justify-center transition-opacity delay-700 duration-1000"
                style="top: {dotTop - 8}px; opacity: {dotOpacity};"
            >
                <div class="h-2 w-2 {atEnd ? 'bg-rust' : 'bg-black'} rounded-full"></div>
            </div>
        </div> -->
 
    </div>



</div>




<style>
:global(body[data-theme="wedding"]) {
    background-color: #EFEFEF !important; /* Replace with your color */
}

.line-transition {
    transition: height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
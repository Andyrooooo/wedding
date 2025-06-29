<script lang="ts">
    import Nav from '../nav/+page.svelte'
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { slide } from 'svelte/transition';

    let pickFromList = false
    let rsvpList = false;
    let rsvpButton = false
    let unresponsivePersonToFind = ''

    // creates array of users from the database
    let people: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []
    let unresponsive: any[] = [];
    $: unresponsive = people.filter(person => person.rsvp_status === 'no response');
    let userGuestList: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []

    onMount(async () => {
        // await delay(2000)
        const res = await fetch('/testPeople')
        if (res.ok) {
            let data = await res.json();
            // Sort by last_name, then first_name
            data.sort((a, b) => {
                const last = a.last_name.localeCompare(b.last_name);
                if (last !== 0) return last;
                return a.first_name.localeCompare(b.first_name);
            });
            people = data;
        }
        setTimeout(() => {
            pickFromList = true
            rsvpButton = true;
        }, 500)
    })

    $: filteredUnresponsiveList = unresponsivePersonToFind.trim() === ''
    ? unresponsive
    : unresponsive.filter(person =>
        person.first_name.toLowerCase().includes(unresponsivePersonToFind.trim().toLowerCase()) ||
        person.last_name.toLowerCase().includes(unresponsivePersonToFind.trim().toLowerCase())
    );

    function selectedPerson(unresponse: any) {
        if (!userGuestList.find(g => g.id === unresponse.id)) {
            userGuestList = [...userGuestList, unresponse];
        }
    }
</script>




<Nav />

<!-- hero section -->
<div class="h-screen relative  overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-40"></div>
    <img src="bigDay2.webp" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <h1 class="font-proper ">RSVP</h1>
        </div>
    </div>
</div>

{#if pickFromList}
    <div transition:slide={{ duration: 500, easing: cubicOut }} class="fixed bottom-0 left-0 w-full h-full z-[4] bg-white/40 backdrop-blur-lg">
        <div class="h-full w-full flex flex-col">
            <p class="mt-[6.5rem] mb-4 px-4 font-bold text-lg font-proper">Who's in your party?</p>

            <div class="relative mb-4 font-proper mx-4">
                <!-- {#if personToFind.trim() !== ''} -->
                <input bind:value={unresponsivePersonToFind} placeholder="Name" class="w-full rounded-md border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-white/50 focus:bg-white/60 transition-all duration-300"/>
                
                <button
                    on:click={() => unresponsivePersonToFind = ''}
                    class="{unresponsivePersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-4 text-xl h-full rounded-md text-black hover:text-black/80 transition-all duration-300"
                ></button>
                <!-- {/if} -->
            </div>

            <div class=" relative font-proper px-4 flex-1 overflow-y-auto scrollbar-hide">
                {#each filteredUnresponsiveList as unresponse}
                    <div class="flex justify-between p-2 items-center hover:bg-white/10 rounded-md transition-all duration-300">
                        <a>{unresponse.first_name} {unresponse.last_name}</a>
                        <button
                            on:click={() => selectedPerson(unresponse)}
                            class="hover:bg-black bg-black/80 text-white transition-all duration-300 border border-white/10 px-4 py-2 rounded-md disabled:opacity-50 font-bold">
                            Add
                        </button>
                    </div>
                {/each}
            </div>


        </div>
    </div> <!-- end of container -->
{/if}

{#if rsvpButton}
    <button on:click={() => rsvpList = true} class="fixed bottom-4 left-4 bg-zinc-200 hover:bg-white z-[6] border border-black/40 rounded-full transition-all duration-300">
        <i class="fa-solid fa-list text-2xl px-4 py-3"></i>
    </button>
{/if}

{#if rsvpList}
    <div transition:slide={{ duration: 500, easing: cubicOut }}  class="fixed bottom-0 left-0 w-full h-4/5 z-[5] bg-white rounded-t-2xl">
        <p class="mb-4 px-4 font-bold text-lg font-proper">Your Guest List:</p>
    </div>
{/if}





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
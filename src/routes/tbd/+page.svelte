<script lang="ts">
    import Nav from '../nav/+page.svelte'
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    // creates array of users from the database
    let people: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []
    let attending: any[] = [];
    let findNameOnList = false
    let findNameComponent = false;
    let currentlySelectedPerson: { id: number, first_name: string, last_name: string } | null = null;
    let weddingReceptionDetails = false
    let showFindName = false
    let nameChecking = false
    let errorModal = false

    $: attending = people.filter(person => person.rsvp_status === 'attending');

    onMount(async () => {
        // await delay(2000)
        const res = await fetch('/people')
        if (res.ok) {
            people = await res.json()
        }
        setTimeout(() => {
            showFindName = true
        }, 500)
    })

    function selectedPerson(first_name: string, last_name: string, id: number) {
        findNameOnList = false  
        currentlySelectedPerson = { id, first_name, last_name };
        // You can add more logic here, like navigating to a specific page or showing more details
    }

    function nameCheckClear() {
        if (currentlySelectedPerson === null) {
            console.log('No person selected');
            errorModal = true
            return
        }
        nameChecking = true
        let archiveList = attending.find(person => person.id === currentlySelectedPerson?.id)
        
        if (
        archiveList &&
        currentlySelectedPerson &&
        archiveList.id === currentlySelectedPerson.id &&
        archiveList.first_name === currentlySelectedPerson.first_name &&
        archiveList.last_name === currentlySelectedPerson.last_name
        ) {
            setTimeout(() => {
                nameChecking = false
                weddingReceptionDetails = true
                findNameComponent = false
                currentlySelectedPerson = null
            }, 1000)
        } else {
            console.log('No match found');
        }
    }

    function downloadDetails() {
        const link = document.createElement('a');
        link.href = '/wcar.pdf'; // Replace with your actual PNG path (relative to public/)
        link.download = 'wcar.pdf'; // The filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<Nav />

<!-- hero section -->
<div class="h-screen relative  overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black/40 z-[2]"></div>
    <img src="bigDay.webp" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-proper relative z-[2]">The Big Day</h1>
        </div>
    </div>
</div>

<!-- find name on list component -->
{#if showFindName}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="absolute bottom-0 left-0 w-full h-full p-4 z-[4] flex justify-center items-center">
        <div class="bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl border border-black/20 p-4 w-full max-w-md">
            {#if !findNameComponent}
                <p class="text-black mb-4 font-proper">Did you already RSVP? If so, please find your name in the list. If you have not RSVP’d please click “RSVP”.</p>
            {:else}
                <div 
                class="mb-4 relative font-proper">
                    <button on:click={() => findNameOnList = !findNameOnList} class="w-full px-4 py-2 flex justify-between items-center border-b {findNameOnList ? 'border-black' : 'border-black/20'} transition-all duration-300">
                        <p class="font-proper transition-all duration-300 {currentlySelectedPerson != null ? 'text-black' : 'text-black/20'} ">{currentlySelectedPerson ? `${currentlySelectedPerson.first_name} ${currentlySelectedPerson.last_name}` : 'Name'}</p> 
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="absolute top-12 left-0 w-full {!findNameOnList ? 'hidden' : 'block'} bg-white rounded-md border border-black/20 flex flex-col h-32 overflow-y-scroll scrollbar-hide">
                        {#each attending as attendee}
                            <a on:click={() => selectedPerson(attendee.first_name, attendee.last_name, attendee.id)} class="hover:bg-black/5 px-4 py-2 transition-all duration-300 cursor-pointer">{attendee.first_name} {attendee.last_name}</a>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="flex gap-4 justify-end items-center font-proper">
                <div class="">
                    {#if findNameComponent}
                        <button on:click={() => {findNameComponent = false, currentlySelectedPerson = null}} class="text-center w-full rounded-md text-white px-4 py-2 hover:bg-black bg-black/80 transition-all duration-300 border border-white/10 cursor-pointer font-bold">Cancel</button>
                    {:else}
                        <a href="/rsvp" class="text-center w-full rounded-md text-white px-4 py-2.5 hover:bg-black bg-black/80 transition-all duration-300 border border-white/10 cursor-pointer font-bold">RSVP</a>
                    {/if}
                </div>

                <div class="">
                    {#if findNameComponent}
                        <button on:click={nameCheckClear} class="text-center w-full rounded-md text-black font-bold px-4 py-2 hover:bg-white bg-white/80 transition-all duration-300 border border-black/10">Enter <a class="{nameChecking ? 'fa-solid fa-circle-notch animate-spin ml-1' : ''}"></a></button>
                    {:else}
                        <button on:click={() => findNameComponent = true} class="text-center w-full rounded-md bg-white/80 px-4 py-2 hover:bg-white transition-all duration-300 border border-black/10 font-bold">Find Name</button>
                    {/if}
                </div>
            </div>

            <!-- <div 
            class="mt-4">
                <button on:click={() => findNameOnList = !findNameOnList} class="w-full rounded-md bg-white/80 px-4 py-2 flex justify-between items-center border-[1px] border-black">
                    <p class="font-proper text-zinc-400">Name</p> 
                    <i class="fa-solid fa-chevron-down"></i>
                </button>

                <div class="{!findNameOnList ? 'hidden' : 'block'} bg-white/80 rounded-md border-[1px] border-black mt-2 flex flex-col gap-2">
                    {#each attending as attendee}
                        <a on:click={() => selectedPerson(attendee.first_name, attendee.last_name)} class="hover:bg-white px-4 py-2 rounded-t-md transition-all duration-300 cursor-pointer">{attendee.first_name} {attendee.last_name}</a>
                    {/each}
                </div>
            </div> -->
        </div>
        
    </div>
{/if}


<!-- error modal -->
{#if errorModal}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center font-proper">
        <div class="bg-white rounded-2xl mx-4 p-4 w-full max-w-md">
            <h1 class="text-red-600 text-xl font-bold mb-4">Error</h1>
            <p class="mb-4">No name was selected, please try again.</p>
            <button on:click={() => (errorModal = false)} class="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 font-bold">Close</button>
        </div>
    </div>
{/if}



<!-- wedding and ceremony details panel -->
 <div class="fixed bottom-0 left-0 w-full transition-all duration-300 ease-in {weddingReceptionDetails ? 'h-5/6' : 'h-0 translate-y-8'} bg-white z-50 rounded-t-2xl border border-black/20 lg:hidden">
<!-- <div class="fixed bottom-0 left-0 w-full transition-all duration-500 ease-in h-5/6 bg-white z-50 rounded-t-2xl p-4 border border-zinc-500/10"> -->

    <div class="flex justify-between p-4 w-full bg-white items-center border-b border-black/10 rounded-t-2xl">
        <button on:click={downloadDetails} class="bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 text-white transition-all duration-300 font-bold"><i class="fa-solid fa-circle-down mr-2"></i>Wedding Details</button>
        <button on:click={() => weddingReceptionDetails = false} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
    </div>

    <div class="relative overflow-y-scroll scrollbar-hide h-full p-4 pb-8">
        <img src="bigDay2.webp" alt="Wedding Ceremony" class="w-full h-64 object-cover rounded-md mb-4">
        <div class="font-proper text-center ">
            <h1 class="text-4xl font-bold mb-4">Wedding Ceremony and Reception</h1>
            <p class="text-black/80 text-sm">Friday, October 17, 2025</p>
            <p class="mb-3 text-black/80 text-sm">2:00pm - 8:00pm</p>
            <p class="mb-2 text-black/80 text-sm">River Bridge Event Center</p>
            <p class="mb-4 text-black/80 text-sm">1225 S Main Street Spanish Fork, Utah 84660</p>
            <p class="text-left mb-2">We’re so excited to celebrate our wedding at River Bridge Event Center in beautiful Spanish Fork, Utah! This rustic venue offers scenic river views, mountain backdrops, and a cozy barn atmosphere—perfect for our special day.</p>
            <p class="text-left mb-2">The wedding will take place from 2:00 PM to 9:00 PM, with the ceremony starting promptly at 2:00 PM. Please arrive by 1:45 PM at the latest to allow time for parking and seating.</p>
            <p class="text-left mb-2">Parking is free and available on-site. Just follow the signs when you arrive—there’s plenty of space for everyone.</p>
            <p class="text-left mb-4">We can’t wait to celebrate with you in this beautiful setting!</p>
            <iframe class="mb-4 rounded-md w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6104.229129631659!2d-111.65733352416906!3d40.09515857149304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874dbd4e5d9bf00f%3A0x1998b6684a4841fe!2sRiver%20Bridge%20Event%20Center!5e0!3m2!1sen!2sus!4v1748739669095!5m2!1sen!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <button on:click={downloadDetails} class="mb-14 bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 w-full font-bold text-white"><i class="fa-solid fa-circle-down mr-2"></i>Download Wedding Details</button>
        </div>
    </div>
</div>



<!-- wedding and ceremony details panel on large screens-->
<div class=" hidden lg:flex fixed top-12 left-0 w-full h-full justify-center items-center z-50 transition-all duration-300 ease-in {weddingReceptionDetails ? '' : 'translate-y-[100vh] '}">
    <div class="bg-white rounded-2xl py-4 border border-black/20 w-4/5 h-4/5 flex flex-col xl:mx-auto max-w-[1200px]">
        <!-- Header -->
        <div class="flex justify-between pb-4 w-full bg-white items-center flex-shrink-0 border-b border-black/10 px-4">
            <button on:click={downloadDetails} class="bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 text-white font-bold"><i class="fa-solid fa-circle-down mr-2"></i>Wedding Details</button>
            <button on:click={() => weddingReceptionDetails = false} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
        </div>

        <!-- Scrollable Content -->
        <div class="relative overflow-y-scroll scrollbar-hide flex-1 px-4 pt-4">
            <img src="bigDay2.webp" alt="Wedding Ceremony" class="w-full h-full object-cover rounded-md mb-4">
            <div class="font-proper text-center ">
                <h1 class="text-4xl font-bold mb-4">Wedding Ceremony and Reception</h1>
                <p class="text-black/80 text-sm">Friday, October 17, 2025</p>
                <p class="mb-3 text-black/80 text-sm">2:00pm - 8:00pm</p>
                <p class="mb-2 text-black/80 text-sm">River Bridge Event Center</p>
                <p class="mb-4 text-black/80 text-sm">1225 S Main Street Spanish Fork, Utah 84660</p>
                <p class="text-left mb-2">We’re so excited to celebrate our wedding at River Bridge Event Center in beautiful Spanish Fork, Utah! This rustic venue offers scenic river views, mountain backdrops, and a cozy barn atmosphere—perfect for our special day.</p>
                <p class="text-left mb-2">The wedding will take place from 2:00 PM to 9:00 PM, with the ceremony starting promptly at 2:00 PM. Please arrive by 1:45 PM at the latest to allow time for parking and seating.</p>
                <p class="text-left mb-2">Parking is free and available on-site. Just follow the signs when you arrive—there’s plenty of space for everyone.</p>
                <p class="text-left mb-4">We can’t wait to celebrate with you in this beautiful setting!</p>
                <iframe class="mb-4 rounded-md w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6104.229129631659!2d-111.65733352416906!3d40.09515857149304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874dbd4e5d9bf00f%3A0x1998b6684a4841fe!2sRiver%20Bridge%20Event%20Center!5e0!3m2!1sen!2sus!4v1748739669095!5m2!1sen!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <button on:click={downloadDetails} class=" bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 w-full font-bold text-white"><i class="fa-solid fa-circle-down mr-2"></i>Download Wedding Details</button>
            </div>
        </div>
    </div>
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
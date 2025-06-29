<script lang="ts">
    import Nav from '../nav/+page.svelte'
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { slide } from 'svelte/transition';

    let pickFromList = false
    let rsvpList = false;
    let rsvpButtonOne = false
    let rsvpButtonTwo = false
    let rsvpButtonThree = false
    let unresponsivePersonToFind = ''
    let yesOrNo = false;
    let rsvpMenu = false;
    let finalDetails = false;
    let errorModal = false;
    let attendingErrorModal = false;
    let savingRSVP = false
    let congratsModal = false
    let weddingReceptionDetails = false;
    let promptModal = false;

    // creates array of users from the database
    let people: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []
    let unresponsive: any[] = [];
    $: unresponsive = people.filter(person => person.rsvp_status === 'no response');
    let userGuestList: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []

    onMount(async () => {
        // await delay(2000)
        const res = await fetch('/people')
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
            rsvpMenu = true;
            rsvpButtonOne = true;
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

    function removeGuest(guest) {
        userGuestList = userGuestList.filter(g => g.id !== guest.id);
    }

    $: allAnswered = userGuestList.length > 0 &&
    userGuestList.every(
      guest => guest.rsvp_status === 'attending' || guest.rsvp_status === 'not attending'
    );

    async function submitGuestsRsvps() {
        savingRSVP = true;
        try {
            const res = await fetch(`/rsvp/update`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userGuestList)
            });
            const data = await res.json();
            congratsModal = true;
            rsvpButtonOne = false;
            rsvpButtonTwo = false;
            rsvpButtonThree = false;
            rsvpList = false;
            unresponsive = unresponsive.filter(person => !userGuestList.some(g => g.id === person.id));
            userGuestList = []; // Clear the guest list after submission
        } catch (error) {
            console.error('Error updating guest:', error);
        } finally {
            savingRSVP = false;
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
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-40"></div>
    <img src="bigDay2.webp" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <h1 class="font-proper ">RSVP</h1>
        </div>
    </div>
</div>

{#if pickFromList}
    <div transition:slide={{ duration: 500, easing: cubicOut }} class="fixed bottom-0 left-0 w-full h-full z-[4] bg-white backdrop-blur-lg">
        <div class="h-full w-full max-w-[768px] mx-auto flex flex-col">
            <p class="mt-[6.5rem] mb-4 px-4 font-bold text-lg font-proper">Who's in your party?</p>

            <div class="relative mb-4 font-proper mx-4">
                <!-- {#if personToFind.trim() !== ''} -->
                <input bind:value={unresponsivePersonToFind} placeholder="Name" class="w-full rounded-md border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-black/5 focus:bg-black/10 transition-all duration-300"/>
                
                <button
                    on:click={() => unresponsivePersonToFind = ''}
                    class="{unresponsivePersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-4 text-xl h-full rounded-md text-black hover:text-black/80 transition-all duration-300"
                ></button>
                <!-- {/if} -->
            </div>

            <div class=" relative font-proper px-4 flex-1 overflow-y-auto scrollbar-hide">
                {#each filteredUnresponsiveList as unresponse}
                    <div class="flex justify-between p-2 items-center hover:bg-black/5 rounded-md transition-all duration-300">
                        <a>{unresponse.first_name} {unresponse.last_name}</a>
                        <button
                            on:click={() => selectedPerson(unresponse)}
                            class="{userGuestList.some(g => g.id === unresponse.id) ? 'bg-black' : 'bg-black/80'} hover:bg-black text-white transition-all duration-300 border border-white/10 px-4 py-2 rounded-md disabled:opacity-50 font-bold" >
                            {#if userGuestList.some(g => g.id === unresponse.id)}
                                <i class="fa-solid fa-check"></i>
                            {:else}
                                Add
                            {/if}
                        </button>
                    </div>
                {/each}
            </div>


        </div>
    </div> <!-- end of container -->
{/if}



{#if yesOrNo}
    <div in:fly={{ x: 800, duration: 500, easing: cubicIn, opacity: 1 }} out:fly={{ x: 800, duration: 500, easing: cubicOut, opacity:1 }} class="fixed bottom-0 left-0 w-full h-full z-[5] bg-white border border-black/20">
        <div class="h-full w-full max-w-[768px] mx-auto flex flex-col">
            <p class="mt-[6.5rem] mb-4 px-4 font-bold font-proper border-b border-black/20 px-4 pb-2">Who will be attending?</p>

            <div class="flex-1 overflow-y-auto scrollbar-hide font-proper mx-4">
                {#each userGuestList as guest}
                    <div class="py-2 flex justify-between items-center">
                        <span>{guest.first_name} {guest.last_name}</span>

                        <div class="flex gap-2">
                            <button class="{guest.rsvp_status === 'attending' ? 'bg-white' : 'bg-black/10'} transition-all duration-300 border border-black/20 px-4 py-2 rounded-md "
                            on:click={() => {guest.rsvp_status = 'attending'}}
                            >Yes</button>

                            <button class="text-white {guest.rsvp_status === 'not attending' ? 'bg-black' : 'bg-black/80'} transition-all duration-300 border border-white/10 px-4 py-2 rounded-md"
                            on:click={() => {guest.rsvp_status = 'not attending'}}
                            >No</button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}



{#if finalDetails}
    <div in:fly={{ x: 800, duration: 500, easing: cubicIn, opacity: 1 }} out:fly={{ x: 800, duration: 500, easing: cubicOut, opacity:1 }} class="fixed bottom-0 left-0 w-full h-full z-[6] bg-white border border-black/20">
        <div class="h-full w-full max-w-[768px] mx-auto flex flex-col">
            <p class="mt-[6.5rem] mb-4 px-4 font-bold font-proper border-b border-black/20 px-4 pb-2">Guests RSVP Status</p>

            <div class="pb-4 flex-1 overflow-y-scroll scrollbar-hide font-proper px-4">
                {#each userGuestList as guest}
                    <div class="py-1 flex justify-between items-center">
                        <span>{guest.first_name} {guest.last_name}</span>
                        <span class="font-bold">{guest.rsvp_status === 'attending' ? 'Attending' : guest.rsvp_status === 'not attending' ? 'Not Attending' : ''}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}



{#if congratsModal}
    <div transition:slide={{ duration: 500 }} class="fixed bottom-0 left-0 w-full h-full z-[6] bg-white border border-black/20">
        <div class="h-full w-full max-w-[768px] mx-auto flex flex-col gap-2 justify-center items-center">
            <i class="fa-solid fa-champagne-glasses text-4xl"></i>
            <p class=" text-lg font-bold">You're All Set!</p>
            <p class="text-center px-12 text-zinc-500">You can now view the wedding details below or check out our wedding registry!</p>
            <!-- <p>Now that you're all set, check the ceremony details to find out where it is!</p> -->
            
        </div>
    </div>
{/if}



{#if rsvpMenu}
    <div class="fixed bottom-4 left-0 z-[7] flex justify-center w-full pointer-events-none">
        <div class="bg-black/40 backdrop-blur-lg rounded-full p-2 flex gap-2 shadow-lg border border-white/20 pointer-events-auto">
            {#if rsvpButtonOne}
                <div class="">
                    <button on:click={() => rsvpList = true} class=" bg-zinc-800 hover:bg-black border border-black/10 rounded-full transition-all duration-300 text-white">
                        <i class="fa-solid fa-list text-xl px-2.5 py-1.5"></i>
                    </button>
                </div>

                <div class="">
                    <button
                    on:click={() => {
                        if (userGuestList.length === 0) {
                        errorModal = true;
                        } else {
                        yesOrNo = true;
                        rsvpButtonOne = false;
                        rsvpButtonTwo = true;
                        }
                    }}
                    class="bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300"
                    >
                    <i class="fa-solid fa-arrow-right text-xl px-3 py-1.5"></i>
                    </button>
                </div>
            {/if}

            {#if rsvpButtonTwo}
                <div class="">
                    <button on:click={() => {yesOrNo = false, rsvpButtonOne = true, rsvpButtonTwo = false}} class=" bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300">
                        <i class="fa-solid fa-arrow-left text-xl px-3 py-1.5"></i>
                    </button>
                </div>

                <div>
                    <button
                        on:click={() => {
                            if (!allAnswered) {
                                attendingErrorModal = true;
                            } else {
                                rsvpButtonOne = false
                                rsvpButtonTwo = false
                                rsvpButtonThree = true
                                finalDetails = true;
                            }
                            }}
                        class="bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300"
                    >
                        <i class="fa-solid fa-arrow-right text-xl px-3 py-1.5"></i>
                    </button>
                </div>
            {/if}

            {#if rsvpButtonThree}
                <div class="">
                    <button on:click={() => {finalDetails = false, rsvpButtonTwo = true, rsvpButtonThree = false}} class=" bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300">
                        <i class="fa-solid fa-arrow-left text-xl px-3 py-1.5"></i>
                    </button>
                </div>

                <div>
                    <button
                        on:click={submitGuestsRsvps}
                        class="bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300"
                    >
                        <p class=" px-4 py-2 font-bold">Submit <a class="{savingRSVP ? 'fa-solid fa-circle-notch animate-spin ml-1' : ''}"></a></p>
                    </button>
                </div>
            {/if}

            {#if congratsModal}
                <div class="">
                    <button  
                    on:click={() => weddingReceptionDetails = true}
                    class=" bg-white/80 hover:bg-white border border-black/10 rounded-full transition-all duration-300 font-bold px-4 py-2">
                        View Wedding Details
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}



{#if rsvpList}
    <div transition:slide={{ duration: 500, easing: cubicOut }}  class="fixed bottom-0 left-0 w-full h-full z-[6] bg-black/40 backdrop-blur-lg">
        <div class="h-4/5 w-full absolute bottom-0 left-0 ">
            <div class="bg-white rounded-t-2xl max-w-[768px] mx-auto h-full flex flex-col">
                <div class="flex justify-end p-4">
                    <button on:click={() => rsvpList = false}>
                        <i class="fa-solid fa-circle-xmark text-3xl text-black/80 hover:text-black transition-all duration-300"></i>
                    </button>
                </div>

                <p class="mb-4 mx-4 font-bold text-lg font-proper border-b border-black/20 px-4 pb-2">Your Guest List:</p>

                <div class="font-proper mx-4 flex-1 overflow-y-auto scrollbar-hide">
                    {#each userGuestList as guest}
                        <div class="flex justify-between items-center p-2">
                            <span>{guest.first_name} {guest.last_name}</span>
                            <button
                                class="ml-2 bg-red-500/80 hover:bg-red-500 transition-all duration-300 border border-red-500/10 px-4 py-2 rounded-md text-white font-bold"
                                on:click={() => removeGuest(guest)}
                            >Remove</button>
                        </div>
                    {/each}
                </div>
            </div>
            
        </div>
    </div>
{/if}


<!-- error modal -->
{#if errorModal}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center font-proper ">
        <div class="bg-white rounded-2xl mx-4 p-4 w-full max-w-md border border-black/20 shadow-lg">
            <h1 class="text-red-600 text-xl font-bold mb-4">Error</h1>
            <p class="mb-4">No name was selected, please try again.</p>
            <button on:click={() => (errorModal = false)} class="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 font-bold">Close</button>
        </div>
    </div>
{/if}

{#if attendingErrorModal}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center font-proper">
        <div class="bg-white rounded-2xl mx-4 p-4 w-full max-w-md border border-black/20 shadow-lg">
            <h1 class="text-red-600 text-xl font-bold mb-4">Error</h1>
            <p class="mb-4">You have not responded yes or no to some guests.</p>
            <button on:click={() => (attendingErrorModal = false)} class="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 font-bold">Close</button>
        </div>
    </div>
{/if}


{#if promptModal}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="absolute bottom-0 left-0 w-full h-full p-4 z-[4] flex justify-center items-center">
        <div class="bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl border border-black/20 p-4 w-full max-w-md">

            <p class="text-black mb-4 font-proper text-center">Need to add more people to the list?</p>
            
            <div class="flex justify-center font-proper ">
                <button class="border border-black/20 bg-white/80 hover:bg-white transition-all duration-300 font-bold px-4 py-2 rounded-md w-full" on:click={() => {pickFromList = true, promptModal = false, rsvpButtonOne = true}}>Add to guest list</button>
            </div>
        </div>
        
    </div>
{/if}


<!-- wedding and ceremony details panel -->
 <div class="fixed bottom-0 left-0 w-full transition-all duration-300 ease-in {weddingReceptionDetails ? 'h-5/6' : 'h-0 translate-y-8'} bg-white z-50 rounded-t-2xl border border-black/20 lg:hidden shadow-2xl">
<!-- <div class="fixed bottom-0 left-0 w-full transition-all duration-500 ease-in h-5/6 bg-white z-50 rounded-t-2xl p-4 border border-zinc-500/10"> -->

    <div class="flex justify-between p-4 w-full bg-white items-center border-b border-black/10 rounded-t-2xl">
        <button on:click={downloadDetails} class="bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 text-white transition-all duration-300 font-bold"><i class="fa-solid fa-circle-down mr-2"></i>Wedding Details</button>
        <button on:click={() => {weddingReceptionDetails = false, congratsModal = false,  pickFromList = false, yesOrNo = false, finalDetails = false, promptModal = true}} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
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
            <button on:click={downloadDetails} class="mb-14 bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 w-full max-w-md font-bold text-white"><i class="fa-solid fa-circle-down mr-2"></i>Download Wedding Details</button>
        </div>
    </div>
</div>



<!-- wedding and ceremony details panel on large screens-->
<div class=" hidden lg:flex fixed top-12 left-0 w-full h-full justify-center items-center z-50 transition-all duration-300 ease-in {weddingReceptionDetails ? '' : 'translate-y-[100vh] '} shadow-2xl">
    <div class="bg-white rounded-2xl py-4 border border-black/20 w-4/5 h-4/5 flex flex-col xl:mx-auto max-w-[1200px]">
        <!-- Header -->
        <div class="flex justify-between pb-4 w-full bg-white items-center flex-shrink-0 border-b border-black/10 px-4">
            <button on:click={downloadDetails} class="bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 text-white font-bold"><i class="fa-solid fa-circle-down mr-2"></i>Wedding Details</button>
            <button on:click={() => {weddingReceptionDetails = false, congratsModal = false,  pickFromList = false, yesOrNo = false, finalDetails = false, promptModal = true}} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
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
                <button on:click={downloadDetails} class=" bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 w-full max-w-md font-bold text-white"><i class="fa-solid fa-circle-down mr-2"></i>Download Wedding Details</button>
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
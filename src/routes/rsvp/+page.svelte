<script lang="ts">
    import Nav from '../nav/+page.svelte'
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    let rsvpComponent = false
    let rsvpList = false
    let addingGuests = true // true
    let guestAttending = false
    let errorModal = false
    let attendingErrorModal = false
    let submitGuests = false
    let savingRSVP = false
    let congratsModal = false
    let weddingReceptionDetails = false

    // creates array of users from the database
    let people: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []
    let unresponsive: any[] = [];
    $: unresponsive = people.filter(person => person.rsvp_status === 'no response');
    $: console.log('unresponsive', unresponsive)

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
            rsvpComponent = true
        }, 500)
    })

    function selectedPerson(unresponse: any) {
        if (!userGuestList.find(g => g.id === unresponse.id)) {
            userGuestList = [...userGuestList, unresponse];
        }
    }

    function removeGuest(guest) {
        userGuestList = userGuestList.filter(g => g.id !== guest.id);
    }

    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                rsvpList = false;
            }
        };

        document.addEventListener('mousedown', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('mousedown', handleClick, true);
            }
        };
    }

    async function submitGuestsRsvps() {
        savingRSVP = true;
        try {
            const res = await fetch(`/rsvp/update`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userGuestList)
            });
            const data = await res.json();
            submitGuests = false
            congratsModal = true
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
    <img src="bigDay2.jpg" alt="Drew and Emma at the lake in colorado" class="relative z-[1] h-full object-cover w-full"/>
    
    <div class="absolute bottom-0 left-0 w-full z-[3] text-5xl lg:text-7xl text-center transition-all duration-300">
        <div class="pt-12 pb-[6rem] relative text-white">
            <!-- <div class="bg-black/20 blur-md absolute top-0 right-0 w-full h-full z-[1]"></div> -->
            <h1 class="font-proper ">RSVP</h1>
        </div>
    </div>
</div>

<!--- find name on list component -->
{#if rsvpComponent}
    <div in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="absolute bottom-0 left-0 w-full h-full p-4 z-[4] flex justify-center items-center">
        <div class="font-proper w-full bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl border border-black/5 max-w-md">
            <!-- text for when the user has finished their RSVP -->
            {#if congratsModal}
                <div class="w-full flex justify-end bg-white rounded-t-2xl pt-4 pr-4">
                    <button on:click={() => {congratsModal = false,  addingGuests = true}}>
                        <i class="fa-solid fa-xmark-circle text-4xl cursor-pointer hover:text-black/80 transition-all duration-300"></i>
                    </button>
                </div>
            {:else}
                <!-- regular text for component -->
                <div class="bg-black text-white py-5 text-center rounded-t-2xl {congratsModal ? 'mb-0' : 'mb-4'}">RSVP</div>
            {/if}

            <div class="{congratsModal ? 'px-0' : 'px-4'} ">
                
                <!-- first panel to add guests -->
                {#if addingGuests}
                <div>
                    <p class="mb-2 font-bold text-lg">Who's in your party?</p>
                    <div class=" relative font-proper">
                        <div use:clickOutside>
                            <button on:click={() => {rsvpList = !rsvpList}} class="w-full px-4 py-2 flex justify-between items-center border-b mb-8 {rsvpList ? 'border-black/60' : 'border-black/20'} transition-all duration-300">
                                <p class="font-proper text-black/80">Name</p> 
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>

                            <div class="absolute top-12 left-0 w-full {rsvpList ? 'block' : 'hidden'} bg-white rounded-md border border-white/10 flex flex-col h-32 overflow-y-scroll scrollbar-hide">
                                {#if unresponsive.length === 0}
                                    <div class="h-full flex justify-center items-center">
                                        <p class="text-center">There are no guests in the list.</p>
                                    </div>
                                {:else}
                                    {#each unresponsive as unresponse}
                                        
                                        <div class="flex justify-between p-2 items-center hover:bg-black/5 transition-all duration-300">
                                            <a>{unresponse.first_name} {unresponse.last_name}</a>
                                            <button
                                                class="{userGuestList.some(g => g.id === unresponse.id) ? 'bg-black' : 'bg-black/80'} hover:bg-black text-white transition-all duration-300 border border-white/10 px-4 py-2 rounded-md disabled:opacity-50 font-bold" on:click={() => selectedPerson(unresponse)}>
                                                {#if userGuestList.some(g => g.id === unresponse.id)}
                                                    <i class="fa-solid fa-check"></i>
                                                {:else}
                                                    Add
                                                {/if}
                                            </button>
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>

                        <p class="pb-2 border-b border-black/20 mb-1 font-bold text-lg">Your Guest List</p>
                        <div class="h-32 pb-4 overflow-y-scroll scrollbar-hide transition-all duration-300">
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


                <!-- second panel to select yes or no to attending -->
                {:else if guestAttending}
                    <div class=""
                    >
                        <!-- on:click={() => {guestAttending = false, addingGuests = true}} -->
                         <!-- <i class="fa-solid fa-circle-chevron-left"></i> -->
                        <button on:click={() => {guestAttending = false, addingGuests = true}} class="mb-4 mr-2 cursor-pointer"><i class="fa-solid fa-circle-chevron-left text-4xl text-black/80 hover:text-black transition-all duration-300 mb-12"></i></button>
                            
                        <p class="pb-2 border-b border-black/20 mb-1 font-bold text-lg ">Who will be attending?</p>
                        <div class="pb-4 h-32 overflow-y-scroll scrollbar-hide">
                            {#each userGuestList as guest}
                                <div class="py-2 flex justify-between items-center">
                                    <span>{guest.first_name} {guest.last_name}</span>

                                    <div class="flex gap-2">
                                        <button class="{guest.rsvp_status === 'attending' ? 'bg-white' : 'bg-white/80'} transition-all duration-300 border border-black/10 px-4 py-2 rounded-md"
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

                    <!-- third panel to check and make sure guest or attending or not and submit -->
                {:else if submitGuests}
                    <div class="w-full">
                        <!-- on:click={() => {guestAttending = false, addingGuests = true}} -->
                         <!-- <i class="fa-solid fa-circle-chevron-left"></i> -->
                        <div class="w-full flex justify-start">
                            <button on:click={() => {submitGuests = false, guestAttending = true}} class="mb-4 mr-2 cursor-pointer"><i class="fa-solid fa-circle-chevron-left text-4xl text-black/80 hover:text-black transition-all duration-300 mb-12"></i>
                        </div>
                            
                        <p class="pb-2 border-b border-black/20 mb-1 font-bold text-lg">Guests RSVP Status</p>
                        <div class="pb-4 h-32 overflow-y-scroll scrollbar-hide">
                            {#each userGuestList as guest}
                                <div class="py-1 flex justify-between items-center">
                                    <span>{guest.first_name} {guest.last_name}</span>
                                    <span>{guest.rsvp_status === 'attending' ? 'Attending' : guest.rsvp_status === 'not attending' ? 'Not Attending' : ''}</span>
                                </div>
                            {/each}
                        </div>
                    </div>

                {:else if congratsModal}
                    <div class="bg-white h-[275px] flex justify-center items-center flex-col gap-2">
                        <p class=" text-lg font-bold">You're All Set!</p>
                        <!-- <p>Now that you're all set, check the ceremony details to find out where it is!</p> -->
                        <i class="fa-solid fa-champagne-glasses text-4xl"></i>
                    </div>
                {/if}
            </div>


            <div class="bg-black {congratsModal ? 'bg-white' : 'bg-black'} text-white p-4 text-center rounded-b-2xl">
                {#if addingGuests}
                    <button on:click={() => {userGuestList.length === 0 ? errorModal = true : addingGuests = false, guestAttending = true}} class="bg-white/80 hover:bg-white transition-all duration-300 border border-black/10 px-4 py-2 rounded-md w-full text-black font-bold">Next</button>
                {:else if guestAttending}
                    <button on:click={() => {
                        // Check if every guest has a valid rsvp_status
                        const allAnswered = userGuestList.every(guest => guest.rsvp_status === 'attending' || guest.rsvp_status === 'not attending');
                        if (!allAnswered) {
                            attendingErrorModal = true;
                        } else {
                            guestAttending = false;
                            submitGuests = true;
                        }
                    }} class="bg-white/80 hover:bg-white transition-all duration-300 border border-black/10 px-4 py-2 rounded-md w-full text-black font-bold">Next</button>
                {:else if submitGuests}
                    <button on:click={submitGuestsRsvps} class="bg-white/80 hover:bg-white transition-all duration-300 border border-black/10 text-black font-bold px-4 py-2 rounded-md w-full">Submit <a class="{savingRSVP ? 'fa-solid fa-circle-notch animate-spin ml-1' : ''}"></a></button>
                {:else if congratsModal}
                    <button on:click={() => weddingReceptionDetails = true} class="bg-black/80 hover:bg-black transition-all duration-300 border border-white/10 px-4 py-2 rounded-md w-full text-white font-bold">View Ceremony Details</button>
                {/if}
            </div>


        </div> <!-- actual component end -->
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

{#if attendingErrorModal}
    <div 
    in:fly={{ y: 100, duration: 600, easing: cubicOut}}
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center font-proper">
        <div class="bg-white rounded-2xl mx-4 p-4 w-full max-w-md">
            <h1 class="text-red-600 text-xl font-bold mb-4">Error</h1>
            <p class="mb-4">You have not responded yes or no to some guests.</p>
            <button on:click={() => (attendingErrorModal = false)} class="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 font-bold">Close</button>
        </div>
    </div>
{/if}



<!-- wedding and ceremony details panel -->
 <div class="fixed bottom-0 left-0 w-full transition-all duration-300 ease-in {weddingReceptionDetails ? 'h-5/6' : 'h-0 translate-y-8'} bg-white z-50 rounded-t-2xl border border-black/20 lg:hidden">
<!-- <div class="fixed bottom-0 left-0 w-full transition-all duration-500 ease-in h-5/6 bg-white z-50 rounded-t-2xl p-4 border border-zinc-500/10"> -->

    <div class="flex justify-between p-4 w-full bg-white items-center border-b border-black/10 rounded-t-2xl">
        <button on:click={downloadDetails} class="bg-black/80 hover:bg-black transition-all duration-300 rounded-md px-4 py-2 border border-white/10 text-white transition-all duration-300 font-bold"><i class="fa-solid fa-circle-down mr-2"></i>Wedding Details</button>
        <button on:click={() => {weddingReceptionDetails = false, congratsModal = false,  addingGuests = true}} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
    </div>

    <div class="relative overflow-y-scroll scrollbar-hide h-full p-4 pb-8">
        <img src="bigDay2.jpg" alt="Wedding Ceremony" class="w-full h-64 object-cover rounded-md mb-4">
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
            <button on:click={() => {weddingReceptionDetails = false, congratsModal = false,  addingGuests = true}} class="fa-solid fa-circle-xmark text-4xl text-black/80 hover:text-black transition-all duration-300"></button>
        </div>

        <!-- Scrollable Content -->
        <div class="relative overflow-y-scroll scrollbar-hide flex-1 px-4 pt-4">
            <img src="bigDay2.jpg" alt="Wedding Ceremony" class="w-full h-full object-cover rounded-md mb-4">
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
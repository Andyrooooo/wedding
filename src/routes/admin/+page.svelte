<script lang="ts">
    import { onMount } from 'svelte';
    import Nav from '../nav/+page.svelte'
    import { ConicGradient } from '@skeletonlabs/skeleton';
    import type { ConicStop } from '@skeletonlabs/skeleton';
    import Modal from '../modals/+page.svelte'
    import { fade } from 'svelte/transition';

    let activeIndex = 0;
    let buttonRefs: HTMLButtonElement[] = [];
    let indicatorStyle = '';
    let loading = true
    let guestInfo = false
    let currentGuestInfo: { id: number, first_name: string, last_name: string, rsvp_status: string } | null = null;
    let currentGuestInfoCopy: { id: number, first_name: string, last_name: string, rsvp_status: string } | null = null;
    let attendingStatus = false

    

    // creates array of users from the database
    let people: Array<{ id: number, first_name: string, last_name: string, rsvp_status: string }> = []
    let attending: any[] = [];
    let notAttending: any[] = [];
    let unresponsive: any[] = [];

    // $: console.log(people)

    $: attending = people.filter(person => person.rsvp_status === 'attending');
    $: notAttending = people.filter(person => person.rsvp_status === 'not attending');
    $: unresponsive = people.filter(person => person.rsvp_status === 'no response');

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onMount(async () => {
        const res = await fetch('/people');
        if (res.ok) {
            let data = await res.json();
            data.sort((a, b) => {
                const last = a.last_name.localeCompare(b.last_name);
                if (last !== 0) return last;
                return a.first_name.localeCompare(b.first_name);
            });
            people = data;
        }
        loading = false;
    });

    function setActive(index: number) {
        guestInfo = false
        activeIndex = index;
        console.log('Active index set to:', activeIndex);
        updateIndicator();
    }

    function updateIndicator() {
        const btn = buttonRefs[activeIndex];
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const parentRect = btn.parentElement?.getBoundingClientRect();
            if (parentRect) {
                const left = rect.left - parentRect.left;
                indicatorStyle = `width: ${rect.width}px; transform: translateX(${left}px);`;
            }
        }
    }

    // Update indicator on mount and when window resizes
    onMount(() => {
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    });


    const tabs = [
        { icon: 'fa-user', label: 'List' },
        { icon: 'fa-clipboard-user', label: 'Attending' },
        { icon: 'fa-user-slash', label: 'Not Attending' },
        { icon: 'fa-user-xmark', label: 'Has Not RSVP\'d' },
        { icon: 'fa-chart-simple', label: 'Graph' }
    ];

    function guestOverlook(index: number) {
        guestInfo = true
        people.find((person) => {
            if (person.id === index) {
                currentGuestInfo = person
                currentGuestInfoCopy = { ...person };
                return true
            }
            return false
        })
        // currentGuestInfo = people[0]
    }

    function customRound(num: number) {
        const decimal = num % 1;
        if (decimal >= 0.6) {
            return Math.ceil(num);
        } else {
            return Math.floor(num);
        }
    }

    

    $: attendingPercentage = customRound((attending.length / people.length) * 100) || 0;
    $: notAttendingPercentage = customRound((notAttending.length / people.length) * 100) || 0;
    $: unresponsivePercentage = customRound((unresponsive.length / people.length) * 100) || 0;

    // $: getConicStops = (() => {
    //     const totalGuests = people.length;
    //     const attendingCount = attending.length;
    //     const notAttendingCount = notAttending.length;
    //     const unresponsiveCount = unresponsive.length;

    //     const attendingPercentage = customRound((attendingCount / totalGuests) * 100);
    //     const notAttendingPercentage = customRound((notAttendingCount / totalGuests) * 100);
    //     const unresponsivePercentage = customRound((unresponsiveCount / totalGuests) * 100);
    // })();




   $: conicStops = [
        // { label: 'Total Guests', color: '#BBA497', start: 0, end: 100 },
        { label: 'Attending', color: '#16A34A', start: 0, end: attendingPercentage },
        { label: 'Not Attending', color: '#DC2626', start: attendingPercentage, end: attendingPercentage + notAttendingPercentage },
        { label: 'No Response', color: '#EA580C', start: attendingPercentage + notAttendingPercentage, end: 100 }
    ];


    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                attendingStatus = false;
            }
        };

        document.addEventListener('mousedown', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('mousedown', handleClick, true);
            }
        };
    }

    function changeCurrentStatus(newStatus: string) {
        if (currentGuestInfo) {
            if (newStatus === 'Attending') {
                currentGuestInfo.rsvp_status = 'attending';
            } else if (newStatus === 'Not Attending') {
                currentGuestInfo.rsvp_status = 'not attending';
            } else if (newStatus === 'No Response') {
                currentGuestInfo.rsvp_status = 'no response';
            }
            attendingStatus = false;
        }
    }

















    let popupModal = false 
    let saveLoading = false
    let saveSuccessful = false
    let delSuccessful = false

    async function saveNewGuestInfo() {
        saveLoading = true;
        let updatedGuestInfo = {
            id: currentGuestInfo!.id,
            first_name: currentGuestInfo!.first_name,
            last_name: currentGuestInfo!.last_name,
            rsvp_status: currentGuestInfo!.rsvp_status
        };
        try {
            const res = await fetch(`/admin/edit`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedGuestInfo)
            });
            const data = await res.json();
            if (res.ok) {
                // Update the people array with the new info
                people = people.map(person =>
                    person.id === updatedGuestInfo.id
                        ? { ...person, ...updatedGuestInfo }
                        : person
                );
                saveSuccessful = true;
            } else {
                console.error('Error updating guest:', res.statusText);
            }
        } catch (error) {
            console.error('Error updating guest:', error);
        } finally {
            saveLoading = false;
        }
    }



    let delModal = false
    
    async function delGuest() {
        saveLoading = true
        let guestToDelete = {
            id: currentGuestInfo?.id,
            first_name: currentGuestInfo?.first_name,
            last_name: currentGuestInfo?.last_name,
            rsvp_status: currentGuestInfo?.rsvp_status
        }

        console.log('before the guest is sent over', guestToDelete)

        try {
            const res = await fetch(`/admin/delete`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(guestToDelete)
            })
            const data = await res.json()
            console.log('Response from server:', data);
            if (res.ok) {
                console.log('guest deleted successfully')
            } else {
                console.error('Error deleting guest:', res.statusText);
            }
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
        
        delay(500).then(() => {
            saveLoading = false
            delSuccessful = true
        })
    }











let guestHover: number | null = null;

let listPersonToFind = ''
let attendingPersonToFind = ''
let notAttendingPersonToFind = ''
let unresponsivePersonToFind = ''

$: filteredGuestList = listPersonToFind.trim() === ''
    ? people
    : people.filter(person =>
        person.first_name.toLowerCase().includes(listPersonToFind.trim().toLowerCase()) ||
        person.last_name.toLowerCase().includes(listPersonToFind.trim().toLowerCase())
    );

$: filteredAttendingList = attendingPersonToFind.trim() === ''
    ? attending
    : attending.filter(person =>
        person.first_name.toLowerCase().includes(attendingPersonToFind.trim().toLowerCase()) ||
        person.last_name.toLowerCase().includes(attendingPersonToFind.trim().toLowerCase())
    );

$: filteredNotAttendingList = notAttendingPersonToFind.trim() === ''
    ? notAttending
    : notAttending.filter(person =>
        person.first_name.toLowerCase().includes(notAttendingPersonToFind.trim().toLowerCase()) ||
        person.last_name.toLowerCase().includes(notAttendingPersonToFind.trim().toLowerCase())
    );

$: filteredUnresponsiveList = unresponsivePersonToFind.trim() === ''
    ? unresponsive
    : unresponsive.filter(person =>
        person.first_name.toLowerCase().includes(unresponsivePersonToFind.trim().toLowerCase()) ||
        person.last_name.toLowerCase().includes(unresponsivePersonToFind.trim().toLowerCase())
    );


</script>

<Nav />

<div class="h-screen relative overflow-y-hidden">
    <div class="pt-32 mx-4 mb-4 text-3xl font-semibold font-proper">
        <h1>Admin Dashboard</h1>
    </div>

    <div class="lg:flex lg:justify-start">
        <div class="mx-4 border-b border-black/20 relative lg:border-0  {guestInfo ? 'lg:w-1/12' : 'lg:w-1/4'} transition-all duration-300">
            <div class="flex lg:flex-col lg:gap-2 justify-between lg:items-start relative pb-4">
                {#each tabs as tab, i}
                    <button
                        class="py-2 px-4 hover:bg-black/10 {activeIndex === i ? 'lg:bg-black/10' : ''} rounded-md transition-all duration-300"
                        bind:this={buttonRefs[i]}
                        on:click={() => setActive(i)}
                    >
                        <!-- Icon for small screens -->
                        <i class={`fa-solid ${tab.icon} block md:hidden text-xl `}></i>
                        <!-- Text for medium and up -->
                        {#if guestInfo}
                            <i class={`fa-solid ${tab.icon}`}></i>
                        {:else}
                            <span in:fade={{ duration: 600 }} class="hidden md:block text-base font-bold"><i class={`fa-solid ${tab.icon} mr-2`}></i>{tab.label}</span>
                        {/if}
                    </button>
                {/each}
                <!-- Moving underline indicator -->
                <div
                    class="absolute bottom-0 left-0 h-2 bg-black rounded-full transition-all duration-200 lg:hidden"
                    style={indicatorStyle}
                ></div>
            </div>
        </div>


        <div class="lg:w-full {guestInfo ? 'lg:w-4/12' : ''} transition-all duration-300">
            <!--------------- active guest list -------------------->
            {#if activeIndex === 0}
                <div class="mt-4 lg:mt-0 {guestInfo ? 'lg:w-full px-0' : 'lg:w-4/5 px-4'} mx-auto transition-all duration-300">
                    <p class="font-proper mb-4">
                        Total Guests:
                        {#if !people.length}
                            <a class="fa-solid fa-circle-notch animate-spin ml-1"></a>
                        {:else}
                            <a class="font-bold">{people.length}</a>
                        {/if}
                    </p>

                    <div class="relative mb-4">
                        <input bind:value={listPersonToFind} class="w-full rounded-md pr-12 border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-black/5 focus:bg-black/10 transition-all duration-300"/>

                        <!-- {#if personToFind.trim() !== ''} -->
                            <button
                                on:click={() => listPersonToFind = ''}
                                class="{listPersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-0 text-xl pr-4 h-full rounded-md text-black/80 hover:text-black transition-all duration-300"
                            ></button>
                        <!-- {/if} -->
                    </div>

                    <div class="overflow-y-scroll scrollbar-hide h-[calc(100vh-300px)] pb-16">
                        {#if loading}
                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>
                        {:else}
                            {#each filteredGuestList as person, index}
                                <div on:mouseover={() => guestHover = index} on:mouseout={() => guestHover = null} class="relative">
                                    <div class:w-1={guestHover === index} class:w-0={guestHover !== index} class="absolute top-1 bottom-1 left-0 rounded-full bg-black mr-2 transition-all duration-200"></div>
                                    <div class="w-full flex justify-between items-center bg-black/10 mb-2 px-2 rounded-md font-proper">
                                        <div class="py-4">
                                            <p>{person.first_name} {person.last_name}</p>
                                        </div>

                                        <div>
                                            <button on:click={() => {guestOverlook(person.id)}} class="bg-white/80 py-2 px-4 rounded-md hover:bg-white transition-all duration-300">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>





            <!--------------- attending list ------------------->
            {:else if activeIndex === 1}
                <div class="mt-4 lg:mt-0 {guestInfo ? 'lg:w-full px-0' : 'lg:w-4/5 px-4'} mx-auto transition-all duration-300">

                    <p class="font-proper mb-4">
                        Total Attending Guests:
                        {#if !people.length}
                            <a class="fa-solid fa-circle-notch animate-spin ml-1"></a>
                        {:else}
                            <a class="font-bold">{attending.length}</a>
                        {/if}
                    </p>

                    <div class="relative mb-4">
                        <input bind:value={attendingPersonToFind} class="w-full rounded-md pr-12 border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-black/5 focus:bg-black/10 transition-all duration-300"/>

                        <!-- {#if personToFind.trim() !== ''} -->
                            <button
                                on:click={() => attendingPersonToFind = ''}
                                class="{attendingPersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-0 text-xl pr-4 h-full rounded-md text-black hover:text-black/80 transition-all duration-300"
                            ></button>
                        <!-- {/if} -->
                    </div>

                    <div class="overflow-y-scroll scrollbar-hide h-[calc(100vh-300px)]">
                        {#if loading}
                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>
                        {:else}
                            {#each filteredAttendingList as attendee, index}
                                <div on:mouseover={() => guestHover = index} on:mouseout={() => guestHover = null} class="relative">
                                    <div class:w-1={guestHover === index} class:w-0={guestHover !== index} class="absolute top-1 bottom-1 left-0 rounded-full bg-black mr-2 transition-all duration-200"></div>
                                    <div class="w-full flex justify-between items-center bg-black/10 mb-2 px-2 rounded-md font-proper">
                                        <div class="py-4">
                                            <p>{attendee.first_name} {attendee.last_name}</p>
                                        </div>

                                        <div>
                                            <button on:click={() => {guestOverlook(attendee.id)}} class="bg-white/80 py-2 px-4 rounded-md hover:bg-white transition-all duration-300">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>







            <!---------------- active not attending list --------------------->
            {:else if activeIndex === 2}
                <div class="mt-4 lg:mt-0 {guestInfo ? 'lg:w-full px-0' : 'lg:w-4/5 px-4'} mx-auto transition-all duration-300">
                    <p class="font-proper mb-4">
                        Total Not Attending:
                        {#if !people.length}
                            <a class="fa-solid fa-circle-notch animate-spin ml-1"></a>
                        {:else}
                            <a class="font-bold">{notAttending.length}</a>
                        {/if}
                    </p>

                    <div class="relative mb-4">
                        <!-- {#if personToFind.trim() !== ''} -->
                        <input bind:value={notAttendingPersonToFind} class="w-full rounded-md pr-12 border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-black/5 focus:bg-black/10 transition-all duration-300"/>
                        
                        <button
                            on:click={() => notAttendingPersonToFind = ''}
                            class="{notAttendingPersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-0 text-xl pr-4 h-full rounded-md text-black hover:text-black/80 transition-all duration-300"
                        ></button>
                        <!-- {/if} -->
                    </div>

                    <div class="overflow-y-scroll scrollbar-hide h-[calc(100vh-300px)]">
                        {#if loading}
                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>
                        {:else}
                            {#if notAttending.length === 0} 
                                <div class="bg-black/20 px-4 py-2 w-full rounded-md font-proper">
                                    <p class="text-center">No one has RSVP'd 'No'</p>
                                </div>
                            {:else}
                                {#each filteredNotAttendingList as none, index}
                                    <div on:mouseover={() => guestHover = index} on:mouseout={() => guestHover = null} class="relative">
                                        <div class:w-1={guestHover === index} class:w-0={guestHover !== index} class="absolute top-1 bottom-1 left-0 rounded-full bg-black mr-2 transition-all duration-200"></div>
                                        <div class="w-full flex justify-between items-center bg-black/10 mb-2 px-2 rounded-md font-proper">
                                            <div class="py-4">
                                                <p>{none.first_name} {none.last_name}</p>
                                            </div>

                                            <div>
                                                <button on:click={() => {guestOverlook(none.id)}} class="bg-white/80 py-2 px-4 rounded-md hover:bg-white transition-all duration-300">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        {/if}
                    </div>
                </div>







            <!------------------ active unresponsive list -------------------->
            {:else if activeIndex === 3}
                <div class="mt-4 lg:mt-0 {guestInfo ? 'lg:w-full px-0' : 'lg:w-4/5 px-4'} mx-auto transition-all duration-300">
                    <p class="font-proper mb-4">
                        Total Unresponsive Guests:
                        {#if !people.length}
                            <a class="fa-solid fa-circle-notch animate-spin ml-1"></a>
                        {:else}
                            <a class="font-bold">{unresponsive.length}</a>
                        {/if}
                    </p>

                    <div class="relative mb-4">
                        <!-- {#if personToFind.trim() !== ''} -->
                        <input bind:value={unresponsivePersonToFind} class="w-full rounded-md pr-12 border border-black/20 focus:outline-none focus:ring-0 focus:border-black bg-black/5 focus:bg-black/10 transition-all duration-300"/>
                        
                        <button
                            on:click={() => unresponsivePersonToFind = ''}
                            class="{unresponsivePersonToFind.trim() !== '' ? 'opacity-100' : 'opacity-0'} fa-solid fa-circle-xmark absolute top-0 right-0 text-xl pr-4 h-full rounded-md text-black hover:text-black/80 transition-all duration-300"
                        ></button>
                        <!-- {/if} -->
                    </div>

                    <div class="overflow-y-scroll scrollbar-hide h-[calc(100vh-300px)]">
                        {#if loading}
                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>

                            <div class=" bg-black/20 mb-2 py-3 px-4 rounded-md font-proper animate-pulse">
                                <p class="opacity-0">Hello</p>
                            </div>
                        {:else}
                            {#if unresponsive.length === 0} 
                                <div class="bg-black/20 p-4 w-full rounded-md font-proper">
                                    <div class="w-full flex justify-center mb-4 text-2xl">
                                        <i class="fa-solid fa-champagne-glasses"></i>
                                    </div>
                                    <p class="text-center">WHOOO HOOO everyones said yes or no</p>
                                </div>
                            {:else}
                                {#each filteredUnresponsiveList as noResponse, index}
                                    <div on:mouseover={() => guestHover = index} on:mouseout={() => guestHover = null} class="relative">
                                        <div class:w-1={guestHover === index} class:w-0={guestHover !== index} class="absolute top-1 bottom-1 left-0 rounded-full bg-black mr-2 transition-all duration-200"></div>
                                        <div class="w-full flex justify-between items-center bg-black/10 mb-2 px-2 rounded-md font-proper">
                                            <div class="py-4">
                                                <p>{noResponse.first_name} {noResponse.last_name}</p>
                                            </div>

                                            <div>
                                                <button on:click={() => {guestOverlook(noResponse.id)}} class="bg-white/80 py-2 px-4 rounded-md hover:bg-white transition-all duration-300">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        {/if}
                    </div>
                </div>




















            <!-------------------------- active graph list ----------------------->
            {:else if activeIndex === 4}
            <!-- <div class="mt-4 lg:mt-0 {guestInfo ? 'lg:w-full px-0' : 'lg:w-4/5 px-4'} mx-auto transition-all duration-300"></div> -->
                <div class="h-full mt-4 px-4  lg:mt-0 lg:w-4/5 mx-auto" >
                    <div class=" flex flex-wrap gap-4">
                        <div class="flex items-center bg-graphGreen/20 px-2 py-1 rounded-full border border-graphGreen shadow-md">
                            <div class="h-2 w-2 bg-black rounded-full mr-1 bg-graphGreen"></div>
                            {#if !people.length}
                                <p class="font-semibold text-graphGreen">Attending <a class="fa-solid fa-circle-notch animate-spin ml-1"></a></p>
                            {:else}
                                <p class="font-semibold text-graphGreen">Attending {attendingPercentage}%</p>
                            {/if}
                        </div>

                        <div class="flex items-center bg-graphRed/20 px-2 py-1 rounded-full border border-graphRed shadow-md">
                            <div class="h-2 w-2 bg-black rounded-full mr-1 bg-graphRed"></div>
                            {#if !people.length}
                                <p class="font-semibold text-graphRed">Not Attending <a class="fa-solid fa-circle-notch animate-spin ml-1"></a></p>
                            {:else}
                                <p class="font-semibold text-graphRed">Not Attending {notAttendingPercentage}%</p>
                            {/if}
                        </div>

                        <div class="flex items-center bg-graphOrange/20 px-2 py-1 rounded-full border border-graphOrange shadow-md">
                            <div class="h-2 w-2 bg-black rounded-full mr-1 bg-graphOrange"></div>
                            {#if !people.length}
                                <p class="font-semibold text-graphOrange">No Response <a class="fa-solid fa-circle-notch animate-spin ml-1"></a></p>
                            {:else}
                                <p class="font-semibold text-graphOrange">No Response {unresponsivePercentage}%</p>
                            {/if}
                        </div>
                    </div>

                    <div class="mt-8">
                        {#if loading}
                            <div class="bg-black/20 rounded-full h-[300px] w-[300px] animate-pulse mx-auto"></div>
                        <!-- <ConicGradient stops={conicStops} legend width="w-[200px]"></ConicGradient> -->
                        {:else}
                            <ConicGradient stops={conicStops} width="w-[300px]"/>
                        {/if}
                    </div>
                </div>
            {/if}

            
        </div>
    </div>


</div>














<!----------- Guest Info Panel ---------------->
    <div class="{guestInfo ? 'opacity-100 lg:w-6/12' : 'opacity-0 h-0 lg:w-0'} lg:h-4/5 fixed bottom-0 left-0 lg:left-auto lg:right-0 w-full bg-black/40 backdrop-blur-lg z-20 lg:z-[4] border-t lg:border-l border-white/20 rounded-t-2xl lg:rounded-t-none lg:rounded-tl-2xl px-4 transition-all duration-300 font-proper ease-in-out">
        <div class="flex flex-col justify-between h-full relative">

            <div>
                <p class="font-proper font-semibold my-8 text-xl text-white">Guest Information</p>

                {#if currentGuestInfo}
                    <div>
                        <input
                        type="text"
                        bind:value={currentGuestInfo.first_name}
                        class="w-full rounded-md focus:outline-none focus:ring-0 bg-white/80 focus:bg-white focus:border-black mb-4 border-black/20"
                        />
                        <input
                        type="text"
                        bind:value={currentGuestInfo.last_name}
                        class="w-full rounded-md focus:outline-none focus:ring-0 bg-white/80 focus:bg-white focus:border-black mb-4 border-black/20"
                        />
                    </div>
                {/if}

                <div 
                use:clickOutside
                class="mt-4">
                    <button on:click={() => attendingStatus = !attendingStatus} class="w-full rounded-md bg-white/80 focus:border-black focus:bg-white px-4 py-2 flex justify-between items-center border border-black/20">
                        <p class="font-proper">
                            {#if currentGuestInfo}
                                {currentGuestInfo.rsvp_status === 'attending' ? 'Attending'
                                : currentGuestInfo.rsvp_status === 'not attending' ? 'Not Attending'
                                : currentGuestInfo.rsvp_status === 'no response' ? 'No Response'
                                : 'RSVP Status'}
                            {:else}
                                RSVP Status
                            {/if}
                        </p> 
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="{!attendingStatus ? 'hidden' : 'block'} bg-white rounded-md border-[1px] border-black mt-2 flex flex-col gap-2">
                        <a on:click={() => changeCurrentStatus('Attending')} class="hover:bg-black/5 px-4 py-2 rounded-t-md transition-all duration-300 cursor-pointer">Attending</a>
                        <a on:click={() => changeCurrentStatus('Not Attending')} class="hover:bg-black/5 px-4 py-2 transition-all duration-300 cursor-pointer">Not Attending</a>
                        <a on:click={() => changeCurrentStatus('No Response')} class="hover:bg-black/5 px-4 py-2 rounded-b-md transition-all duration-300 cursor-pointer">No Response</a>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex justify-between gap-4 mb-4">
                    <div class=" basis-1/2">
                        <button
                        on:click={() => {
                            if (currentGuestInfo && currentGuestInfoCopy) {
                            currentGuestInfo.first_name = currentGuestInfoCopy.first_name;
                            currentGuestInfo.last_name = currentGuestInfoCopy.last_name;
                            currentGuestInfo.rsvp_status = currentGuestInfoCopy.rsvp_status;
                            }
                            guestInfo = false;
                            currentGuestInfo = null;
                        }}
                        class="text-center w-full rounded-md text-white font-bold px-4 py-2 hover:bg-black bg-black/80 transition-all duration-300 border border-white/10"
                        >
                        Cancel
                        </button>
                    </div>

                    <div class="basis-1/2">
                        <button on:click={() => popupModal = true} class="text-center w-full rounded-md text-black px-4 py-2 hover:bg-white bg-white/80 transition-all duration-300 font-bold border border-black/10">Save</button>
                    </div>
                </div>

                <div class="w-full flex justify-center mb-4">
                    <button  on:click={() => delModal = true} class="font-bold px-4 py-2 hover:bg-white/20 rounded-md transition-all duration-300 text-white">Delete Guest</button>
                </div>
            </div>
        </div>
    </div>























<!-------------- save Modal ------------------->
<div 
class:-translate-y-24={popupModal}
class:translate-y-48={!popupModal}
class="fixed bottom-0 left-0 w-full z-50 transform transition-all duration-300 px-4">
    <div class="bg-black/40 shadow-lg border border-white/20 m-4 rounded-lg px-4 py-2 backdrop-blur-lg max-w-md mx-auto ">
        {#if guestInfo && !saveSuccessful}
            <h1 class="text-xl font-proper mb-2 font-semibold text-white">Change Guest Settings</h1>
        {:else if saveSuccessful}
            <h1 class="text-xl font-proper mb-2 font-semibold text-white"><a class="fa-solid fa-square-check mr-1 text-lime-700"></a>Settings Changed</h1>
        {/if}

        <div>
            {#if guestInfo && !saveSuccessful}
                <h1 class=" mb-4 text-white/80">Are you sure you want to change <a class="font-bold text-white">{currentGuestInfoCopy?.first_name} {currentGuestInfoCopy?.last_name}'s</a> settings?</h1>
            {:else if saveSuccessful}
                <h1 class=" mb-2 text-white/80">Awesome! <a class="font-bold  text-white">{currentGuestInfoCopy?.first_name} {currentGuestInfoCopy?.last_name}'s</a> settings were changed to: </h1>
                <div class="p-2 border border-white/10 bg-black/60 rounded-md mb-4">
                    <p class=" text-white/80">Name: <a class="font-bold text-white">{currentGuestInfo?.first_name} {currentGuestInfo?.last_name}</a></p>
                    <p class="text-white/80">Response Status: <a class="font-bold text-white">{currentGuestInfo?.rsvp_status}</a></p>
                </div>
            {/if}
        </div>

        <div class="flex justify-end {guestInfo && !saveSuccessful ? 'gap-4' : ''}">
            <div class="">
                {#if guestInfo && !saveSuccessful}
                    <button 
                    on:click={() => {
                            popupModal = false;
                        }}
                    class="text-center w-full rounded-md text-white px-4 py-2 bg-black/80 border border-white/10 hover:bg-black transition-all duration-300">
                    Cancel
                    </button>
                {:else if saveSuccessful}
                    <button 
                    on:click={() => {
                            popupModal = false;
                            guestInfo = false;
                            saveSuccessful = false
                        }}
                    class="text-center w-full rounded-md text-white px-4 py-2 bg-black/80 border border-white/10 hover:bg-black transition-all duration-300">
                    Close
                    </button>
                {/if}
                
            </div>

            <div class="">
                {#if guestInfo && !saveSuccessful}
                    <button on:click={saveNewGuestInfo} class="text-center w-full rounded-md text-black px-4 py-2 bg-white/80 hover:bg-white transition-all duration-300 border border-black/10">Save <a class="{saveLoading ? 'fa-solid fa-circle-notch animate-spin ml-1' : ''}"></a></button>
                {/if}
            </div>
        </div>
    </div>
</div>










<!-------------- Delete Modal ------------------->
<div 
class:translate-y-0={delModal}
class:translate-y-48={!delModal}
class="fixed bottom-0 left-0 w-full z-50 transform transition-all duration-300">
    <div class="bg-white/60 shadow-lg border border-zinc-500/10 m-4 rounded-md px-4 py-2 backdrop-blur-md  max-w-[768px] mx-auto">
        {#if guestInfo && !delSuccessful}
            <h1 class="text-xl font-proper mb-2 font-semibold">Deleting Guest</h1>
        {:else if delSuccessful}
            <h1 class="text-xl font-proper mb-2 font-semibold">Guest Removed</h1>
        {/if}

        <div>
            {#if guestInfo && !delSuccessful}
                <h1 class=" mb-4">Are you sure you want to delete <a class="font-bold text-zinc-800">{currentGuestInfo?.first_name} {currentGuestInfo?.last_name}</a>?</h1>
            {:else if delSuccessful}
                <h1 class=" mb-4">Awesome! <a class="font-bold text-zinc-800">{currentGuestInfo?.first_name} {currentGuestInfo?.last_name}</a> was removed.</h1>
            {/if}
        </div>

        <div class="flex justify-end {guestInfo && !delSuccessful ? 'gap-4' : ''}">
        <!-- <div class="flex justify-end gap-4"> -->
            <div class="">
                {#if guestInfo && !delSuccessful}
                    <button 
                    on:click={() => {
                            delModal = false;
                        }}
                    class="text-center w-full rounded-md text-white px-4 py-2 bg-black hover:bg-black/90 transition-all duration-300">
                    Cancel
                    </button>
                {:else if delSuccessful}
                    <button 
                    on:click={() => {
                            delModal = false;
                            guestInfo = false;
                            delSuccessful = false
                            if (currentGuestInfo) {
                                people = people.filter(person => person.id !== currentGuestInfo?.id);
                            }
                        }}
                    class="text-center w-full rounded-md text-white px-4 py-2 bg-black hover:bg-black/90 transition-all duration-300">
                    Close
                    </button>
                {/if}
                
            </div>

            <div class="">
                {#if guestInfo && !delSuccessful}
                    <button on:click={delGuest} class="text-center w-full rounded-md text-black px-4 py-2 bg-white hover:bg-white/60 transition-all duration-300 border border-zinc-500/30">Delete <a class="{saveLoading ? 'fa-solid fa-circle-notch animate-spin ml-1' : ''}"></a></button>
                {/if}
            </div>
        </div>
    </div>
</div>



<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

:global(body[data-theme="wedding"]) {
    background-color: #EFEFEF !important; /* Replace with your color */
}
</style>
<template>
    <div class="fixed py-5 px-7">
        <menu class="flex-grow bg-blue-200 shadow-md rounded-md py-2 px-6 space-y-3">
            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'home' }">Asror Akbarkhodjaev</router-link>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'upcomingTrips' }">Upcoming Trips</router-link>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'newTrip' }">New Trip</router-link>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'pastTrips' }">Past Trips</router-link>
            </div>
        </menu>
    </div>
</template>

<script>
export default {
    name: 'LeftMenu',
}
</script>
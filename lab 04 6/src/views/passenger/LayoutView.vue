<template>
  <div v-if="data">
    <h1>{{ data.name }}</h1>
    <nav>
      <RouterLink :to="{ name: 'passenger-detail-view' }">Details</RouterLink>
      |
      <RouterLink v-if="data.airline && data.airline.length > 0" :to="{ name: 'airline-detail-view', params: { id: route.params.id, airlineId: data.airline[0]._id } }">Airline</RouterLink>
      |
      <RouterLink :to="{ name: 'passenger-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'passenger-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :data="data" />
    <AirlineView v-if="airline" :airline="airline" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { type Airline } from '@/types'
import PassengerServices from '@/services/PassengerServices'
import AirlineServices from '@/services/AirlineServices'
import { useRoute } from 'vue-router'
import AirlineView from '@/views/passenger/AirlineView.vue'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

//const data = ref<Data | null>(null)
const airline = ref<Airline | null>(null)
//const router = useRouter()
const route = useRoute()
const store = useEventStore()
const { data } = storeToRefs(store)

onMounted(() => {
  console.log('Component mounted with ID:', route.params.id)
  fetchPassengerData()
})

watch(() => route.params.airlineId, (newAirlineId) => {
  if (newAirlineId) {
    fetchAirlineData(newAirlineId as string)
  }
})

const fetchPassengerData = () => {
  PassengerServices.getPassenger(route.params.id as string)
    .then((responseData) => {
      console.log('Data fetched:', responseData);
      data.value = responseData;
      if (route.params.airlineId) {
        fetchAirlineData(route.params.airlineId as string)
      }
    })
}

const fetchAirlineData = (airlineId: string) => {
  AirlineServices.getAirline(airlineId)
    .then((airlineResponse) => {
      console.log('Airline data fetched:', airlineResponse);
      airline.value = airlineResponse;
    })
    .catch((error) => {
      console.error('Error fetching airline data:', error);
    })
}
</script>
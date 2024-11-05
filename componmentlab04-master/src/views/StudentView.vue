<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const events = ref<Event[]>([])
onMounted(() => {
  StudentService.getEvents()
    .then(response => {
      events.value = response.data
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Student Information</h1>
  <!-- new element -->
  <div class="events">
    <StudentCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import FlashMessage from '../components/FlashMessage.vue';

const props = defineProps<{
  event: Event
}>();

const router = useRouter();
//const showFlashMessage = ref(false);
//const flashMessage = ref('');
//
//const editEvent = async () => {
//  // Simulate data update
//  try {
//    // Here you would call the API to update the event data
//    // For now, we'll just simulate it
//    await new Promise(resolve => setTimeout(resolve, 1000));
//
//    // Navigate to the details page
//    router.push({
//      name: 'event-detail-view',
//      params: { id: props.event.id },
//      query: { flashMessage: 'Data has been updated' }
//    });
//    // Show the flash message
//    showFlashMessage.value = true;
//    flashMessage.value = 'Data has been updated';
//  } catch (error) {
//    console.error('Failed to update event data', error);
//  }
//};
//
//const closeFlashMessage = () => {
//  showFlashMessage.value = false;
//};
</script>

<template>
  <div class="event-card">
 <RouterLink class="event-link" :to="{ name: 'event-detail-view', params:{ id: props.event.id } }">
       <h2>{{ props.event.title }}</h2>
      <span>@{{ props.event.time }} on {{ props.event.date }}</span>
  </RouterLink>


 <!-- <button @click="editEvent">Edit</button> -->
 <!-- <FlashMessage v-if="showFlashMessage" :message="flashMessage" @close="closeFlashMessage" /> -->
  </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  position: relative;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-card button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.event-card button:hover {
  background-color: #0056b3;
}

</style>

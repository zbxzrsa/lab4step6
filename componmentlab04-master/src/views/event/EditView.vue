<!-- src/views/EventDetailView.vue -->

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import type { Event } from '@/types';
import FlashMessage from '@/components/FlashMessage.vue';

const route = useRoute();
const event = ref<Event | null>(null);
const showFlashMessage = ref(false);
const flashMessage = ref('');

onMounted(async () => {
  try {
    const response = await EventService.getEvent(parseInt(route.params.id as string));
    event.value = response.data;
  } catch (error) {
    console.error('Event not found', error);
  }

  // Check if there is a flash message in the route query
  if (route.query.flashMessage) {
    showFlashMessage.value = true;
    flashMessage.value = route.query.flashMessage as string;
  }
});

// Watch for changes in the route query to handle flash messages
watch(() => route.query.flashMessage, (newFlashMessage) => {
  if (newFlashMessage) {
    showFlashMessage.value = true;
    flashMessage.value = newFlashMessage as string;
  }
});

const closeFlashMessage = () => {
  showFlashMessage.value = false;
};

const showUpdatedMessage = () => {
  showFlashMessage.value = true;
  flashMessage.value = 'Data has been updated';
};
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <button @click="showUpdatedMessage">Show Updated Message</button>
    <FlashMessage v-if="showFlashMessage" :message="flashMessage" @close="closeFlashMessage" />
  </div>
  <div v-else>
    <p>Event not found.</p>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>

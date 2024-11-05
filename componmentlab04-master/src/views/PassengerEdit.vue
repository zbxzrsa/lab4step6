<template>
  <div>
    <FlashMessage v-if="showMessage" message="Update is in progress" :visible="showMessage" />
    <h1>Edit Passenger Details</h1>
    <form @submit.prevent="updatePassenger">
      <label for="name">Name:</label>
      <input type="text" v-model="passenger.name" id="name" />
      <label for="age">Age:</label>
      <input type="number" v-model="passenger.age" id="age" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import FlashMessage from '../components/FlashMessage.vue';

const route = useRoute();
const router = useRouter();
const passenger = ref({});
const showMessage = ref(false);

onMounted(() => {
  axios.get(`https://api.instantwebtools.net/v1/passenger/${route.params.id}`)
    .then(response => {
      passenger.value = response.data;
    });
});

const updatePassenger = () => {
  showMessage.value = true;
  axios.put(`https://api.instantwebtools.net/v1/passenger/${route.params.id}`, passenger.value)
    .then(() => {
      setTimeout(() => {
        router.push({ name: 'PassengerList' });
      }, 5000);
    });
};
</script>

<style scoped>
/* 样式 */
</style>

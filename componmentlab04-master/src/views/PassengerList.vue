<template>
  <div>
    <h1>Passenger List</h1>
    <ul>
      <li v-for="passenger in passengers" :key="passenger._id">
        <router-link :to="{ name: 'PassengerDetail', params: { id: passenger._id } }">{{ passenger.name }}</router-link>
        <button @click="editPassenger(passenger._id)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const passengers = ref([]);
const router = useRouter();

onMounted(() => {
  axios.get('https://api.instantwebtools.net/v1/passenger')
    .then(response => {
      passengers.value = response.data.data;
    });
});

const editPassenger = (id) => {
  router.push({ name: 'PassengerEdit', params: { id } });
};
</script>

<style scoped>
/* 样式 */
</style>

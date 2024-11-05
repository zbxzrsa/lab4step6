<template>
  <div>
    <h1>Passenger Detail</h1>
    <div v-if="passenger">
      <p>ID: {{ passenger._id }}</p>
      <p>Name: {{ passenger.name }}</p>
      <p>Trips: {{ passenger.trips }}</p>
      <p>Airline: {{ passenger.airline[0].name }}</p>
      <router-link :to="{ name: 'PassengerList' }">Back to List</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 定义乘客类型
interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: { name: string }[];
}
const route = useRoute();
const passenger = ref<Passenger | null>(null);
// const passenger = ref(route.params.passenger);
if (typeof route.params.passenger === 'object') {
  passenger.value = route.params.passenger as Passenger;
}
</script>

<style scoped>
/* 样式 */
</style>

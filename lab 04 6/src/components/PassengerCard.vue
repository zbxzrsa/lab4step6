<script setup lang="ts">
import { type Data } from '@/types'
defineProps<{
  data: Data
}>()

</script>

<template>
<div class="data-class">
    <RouterLink class="data-link" :to="{ name: 'passenger-detail-view', params: { id: data._id } }">
      <div class="data-card">
        <h2>{{ data.name }}</h2>
        <span>Trips :  {{ data.trips }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.data-class {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.data-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.data-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.data-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
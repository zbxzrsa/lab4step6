<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Airline } from '@/types'

const props = defineProps<{
  airline: Airline
}>()
const { airline } = toRefs(props)
</script>
<template>
  <div v-if="airline">
    <h1>{{ airline.name }}</h1>
    <p>Country: {{ airline.country }}</p>
    <p>Headquarters: {{ airline.head_quaters }}</p>
    <p>Website: <a :href="airline.website" target="_blank">{{ airline.website }}</a></p>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { type Data } from '@/types'

const props = defineProps<{
    data: Data
    id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data } = toRefs(props)

</script>
<template>
    <p>Edit  here</p>
</template>
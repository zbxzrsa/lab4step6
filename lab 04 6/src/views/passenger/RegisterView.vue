<script setup lang="ts">
import { toRefs } from 'vue'
import { type Data } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps<{
    data: Data
    id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {

    store.updateMessage('You are successuflly registered for ' + props.data.name)
  setTimeout(() => {
    store.resetMessage()
  }, 5000)
  router.push({ name: 'passenger-detail-view', params: { id: props.data._id } })
}

</script>

<template>
    <p>update the passenger details</p>
    <button @click="register">update</button>
</template>
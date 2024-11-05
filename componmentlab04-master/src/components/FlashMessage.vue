<template>
  <div v-if="visible" class="flash-message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  message: String,
  visible: Boolean,
});

const visible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      visible.value = false;
    }, 5000);
  }
});
</script>

<style scoped>
.flash-message {
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>

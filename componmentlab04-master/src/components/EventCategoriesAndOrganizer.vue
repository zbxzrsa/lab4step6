<template>
    <div class="event-categories-and-organizer">
      <span class="text-align-right">{{ organizerName }}</span>
      <span class="text-align-right">{{ categories.join(', ') }}</span>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    organizerName: string;
    categories: string[];
  }>();
  
  // 确保在模板中使用这些 props
  const { organizerName, categories } = props;
  </script>
  
  <style scoped>
  .event-categories-and-organizer {
    display: flex;
    justify-content: flex-end;
    font-size: 16px; /* 调整字体大小以匹配需求 */
  }
  
  .text-align-right {
    margin-left: 10px; /* 可以调整间距 */
    
  }
  </style>
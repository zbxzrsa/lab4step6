<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventCategoriesAndOrganizer from '@/components/EventCategoriesAndOrganizer.vue'
import { type Event } from '@/types'
import { onMounted, ref, computed,watchEffect} from 'vue'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router';
import router from '@/router'
//import nProgress from 'nprogress'




const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})


const route = useRoute();
const itemsPerPage = ref(5); // 默认每页显示5条记录
if (route.query.itemsPerPage) {
  itemsPerPage.value = parseInt(route.query.itemsPerPage as string, 10);
}

const props = defineProps<{
  page: number;
}>();

const page = computed(() => props.page);

onMounted(() => {

    watchEffect(() => {

      EventService.getEvents(itemsPerPage.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })

  })
})

function navigateWithPageSize(size: number) {
  router.push({ path: router.currentRoute.value.fullPath, query: { ...router.currentRoute.value.query, itemsPerPage: size } });
}

</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="event-card">
      <EventCategoriesAndOrganizer
        :organizer-name="event.organizer"
        :categories="[event.category]"
        v-for="event in events"
        :key="`${event.id}-info`"
      />
    </div>
    <div class="pagination">
       <RouterLink
         id="page-prev"
         :to="{ name: 'event-list-view', query: { page: page - 1 } }"
         rel="prev"
         v-if="page != 1"
         >&#60; Prev Page</RouterLink
       >
       <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNexPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>

</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 为了让分类和组织者信息对齐 */
.event-categories-and-organizer {
  text-align: right;
  width: 100%;
}

.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  box-sizing: border-box; /* 确保边框和内边距包含在总宽度和高度内 */
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-categories-and-organizer {
  display: flex;
  justify-content: flex-end;
  font-size: 16px; /* 调整字体大小以匹配需求 */
  margin-top: 10px; /* 与事件卡片之间的间距 */
}

.text-align-right {
  margin-left: 10px; /* 可以调整间距 */
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

</style>

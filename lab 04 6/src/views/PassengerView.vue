<script setup lang="ts">
import { type Data } from '@/types'
import {
  ref, onMounted, computed, watch
} from 'vue'
import PassengerCard from '@/components/PassengerCard.vue';
import PassengerServices from '@/services/PassengerServices';
import { useRoute, useRouter } from 'vue-router';

const datas = ref<Data[] | null>(null)
const totalDatas = ref(0)
const page = ref(1) // 使用 ref 来手动更新页码

const route = useRoute()
const router = useRouter()

//const hasNexPage = computed(() => page.value <= totalDatas.value)

const displayedData = computed(() => {
  if (!datas.value) return [];
  return datas.value.slice((page.value - 1) * 1, page.value);
});

// 监听路由变化，更新页码
watch(() => route.query.page, (newPage) => {
  if (newPage) {
    page.value = Number(newPage);
    fetchPassengers();
  }
}, { immediate: true })

onMounted(() => {
  fetchPassengers()
})

const fetchPassengers = () => {
  PassengerServices.getPassengers(1, page.value)
    .then((response) => {
      datas.value = response.data.data;
      totalDatas.value = response.data.totalPassengers;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};

// 更新页面的方法
const changePage = (newPage: number) => {
  page.value = newPage;
  router.push({ name: 'passenger-list-view', query: { page: newPage } });
  fetchPassengers();
};

</script>

<template>
  <h1>Passengers List</h1>
  <div class="datas">
    <template v-for="data in displayedData" :key="data._id">
      <PassengerCard :data="data" />
    </template>
  </div>
  <div class="pagination">
    <button
      id="page-prev"
      :disabled="page <= 1"
      @click="changePage(page - 1)"
    >
      &#60; Prev Page
    </button>
    <button
      id="page-next"
      :disabled="page >= totalDatas"
      @click="changePage(page + 1)"
    >
      Next Page &#62;
    </button>
  </div>
</template>

<style scoped>
.datas {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center; /* 居中显示按钮 */
  margin-top: 20px; /* 添加一些外边距 */
}

.pagination button {
  margin: 0 10px; /* 给按钮之间添加一些间距 */
  padding: 8px 16px; /* 按钮的内边距 */
  font-size: 16px; /* 按钮文字大小 */
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5; /* 禁用按钮时的样式 */
  cursor: not-allowed;
}

</style>

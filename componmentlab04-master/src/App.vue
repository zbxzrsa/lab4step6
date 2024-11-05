<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'


const store = useMessageStore()
const { message } = storeToRefs(store)
const router = useRouter();
const route = useRoute();

const itemsPerPage = ref(5); // 默认每页显示5条记录

watchEffect(() => {
  if (route.query.itemsPerPage) {
    itemsPerPage.value = parseInt(route.query.itemsPerPage as string, 10);
  }
});

function navigateWithPageSize(size: number) {
  router.push({ path: '/', query: { ...route.query, itemsPerPage: size } });
}


</script>

<template>
<div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Event</RouterLink> |
          <RouterLink to="/about">About</RouterLink> |
          <RouterLink to="/student">Student</RouterLink>
          <div>
            <button class="page-size-btn" @click="navigateWithPageSize(3)">Page Size: 3</button>
          <button class="page-size-btn" @click="navigateWithPageSize(4)">Page Size: 4</button>
          <button class="page-size-btn" @click="navigateWithPageSize(5)">Page Size: 5</button>
        </div>
        </nav>
      </div>
    </header>


    <RouterView :itemsPerPage="itemsPerPage" />  </div>
</template>

<style >

#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;

}

nav a.router-link-exact-active {
  color: #42b983;
 }

h2 {
  font-size: 20px;
}


.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.page-size-btn {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #42b983;
  background-color: white;
  color: #42b983;
  transition: all 0.3s ease;
}

.page-size-btn.active {
  background-color: white;
  color: green;
}

.page-size-btn:hover {
  background-color: white;
  color: green;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
}


</style>

import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized, type NavigationGuard } from 'vue-router';
import EventListView from '@/views/EventListView.vue';
import AboutView from '@/views/AboutView.vue';
import StudentView from '@/views/StudentView.vue';
import EventDetailView from '@/views/event/DetailView.vue';
import EventRegisterView from '@/views/event/RegisterView.vue';
import EventEditView from '@/views/event/EditView.vue';
import EventLayoutView from '@/views/event/LayoutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import PassengerList from '@/views/PassengerList.vue';
import PassengerDetail from '@/views/PassengerDetail.vue';
import PassengerEdit from '@/views/PassengerEdit.vue';
import axios from 'axios';
import nProgress from 'nprogress';
import EventService from '@/services/EventService';
import { useEventStore } from '@/stores/event';

const passengerDetailRoute: RouteRecordRaw = {
  path: '/passenger/:id',
  name: 'PassengerDetail',
  component: PassengerDetail,
  props: true,
  beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuard) => {
    try {
      const response = await axios.get(`https://api.instantwebtools.net/v1/passenger/${to.params.id}`);
      to.params.passenger = response.data;
      next();
    } catch (error) {
      console.error('Error fetching passenger data:', error);
      next(false);
    }
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    name: 'PassengerList',
    component: PassengerList
  },
  passengerDetailRoute,
  {
    path: '/edit/:id',
    name: 'PassengerEdit',
    component: PassengerEdit,
    props: true,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuard) => {
      try {
        const response = await axios.get(`https://api.instantwebtools.net/v1/passenger/${to.params.id}`);
        to.params.passenger = response.data;
        next();
      } catch (error) {
        console.error('Error fetching passenger data:', error);
        next(false);
      }
    }
  },
  {
    path: '/',
    name: 'event-list-view',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
  },
  {
    path: '/event/:id',
    name: 'event-layout-view',
    component: EventLayoutView,
    props: true,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuard) => {
      const id = parseInt(to.params.id as string);
      const eventStore = useEventStore();
      return EventService.getEvent(id)
        .then((response) => {
          eventStore.setEvent(response.data);
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return { name: '404-resource-view', params: { resource: 'event' } };
          } else {
            return { name: 'network-error-view' };
          }
        });
    },
    children: [
      {
        path: '',
        name: 'event-detail-view',
        component: EventDetailView,
        props: true
      },
      {
        path: 'register',
        name: 'event-register-view',
        component: EventRegisterView,
        props: true
      },
      {
        path: 'edit',
        name: 'event-edit-view',
        component: EventEditView,
        props: true
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/404/:resource',
    name: '404-resource-view',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/student',
    name: 'student',
    component: StudentView
  },
  {
    path: '/network-error',
    name: 'network-error-view',
    component: NetworkErrorView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition: any) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(() => {
  nProgress.start();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;

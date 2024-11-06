import { createRouter, createWebHistory } from 'vue-router'
import PassengerView from '@/views/PassengerView.vue'
import AboutView from '@/views/AboutView.vue'
import PassengerDetailView from '@/views/passenger/DetailView.vue'
import PassengerRegisterView from '@/views/passenger/RegisterView.vue'
import PassengerEditView from '@/views/passenger/EditView.vue'
import PassengerLayoutView from '@/views/passenger/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import AirlineView from '@/views/passenger/AirlineView.vue'
import nProgress from 'nprogress'
import PassengerServices from '@/services/PassengerServices'
import { useEventStore } from '@/stores/event'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger',
      component: PassengerView,
      props: route => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout-view',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = to.params._id as string;
        const eventStore = useEventStore()
        return PassengerServices.getPassenger(id)
          .then((response) => {
            // need to setup the data for the event
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'passenger-detail-view',
          component: PassengerDetailView,
          props: true,
        },
        {
          path: 'airline/:airlineId',
          name: 'airline-detail-view',
          component: AirlineView,
          props: true,
        },
        {
          path: 'register',
          name: 'passenger-register-view',
          component: PassengerRegisterView,
          props: true,
        },
        {
          path: 'edit',
          name: 'passenger-edit-view',
          component: PassengerEditView,
          props: true,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})


export default router
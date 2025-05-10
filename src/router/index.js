import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ApiDataPage from '../views/ApiDataPage.vue'
import FormPage from '../views/FormPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/api-data',
      name: 'api-data',
      component: ApiDataPage
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< Updated upstream
import HomeView from '../views/HomeView.vue'
=======
import WelcomeView from '@/views/WelcomeView.vue'
import LobbyView from '@/views/LobbyView.vue'
>>>>>>> Stashed changes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

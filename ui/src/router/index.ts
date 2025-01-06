import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import LobbyView from '@/views/LobbyView.vue'
import { useState } from '@/stores/state'
import { storeToRefs } from 'pinia'
import useP2P from '@/p2p/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/lobby/:lobbyId',
      name: 'lobby',
      component: LobbyView,
      beforeEnter: async (to, from, next) => {

        const state = useState()
        const { p2p, peer } = storeToRefs(state)
        const lobbyId = to.params.lobbyId
        console.log(lobbyId);

        if (lobbyId !== '' || lobbyId !== undefined) {
          p2p.value = await useP2P(lobbyId as string)
          peer.value = p2p.value.PEER
          // hostingPeer.value = p2p.value.PEER
        }

        if (!state.p2p || state.getLobbyId() === '') {
          next('/')
        } else {
          next()
        }
      }
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

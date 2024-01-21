// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: () => {
          return { path: '/bom' }
        }
      },
      {
        path: '/hello',
        name: 'hello',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "hello" */ '@/views/HelloView.vue')
      },
      {
        path: '/projects',
        name: 'projects',
        meta: {
          title: 'Projekte'
        },
        component: () => import(/* webpackChunkName: "projects" */ '@/views/ProjectsView.vue')
      },
      {
        path: '/catalog',
        name: 'catalog',
        meta: {
          title: 'Katalog'
        },
        component: () => import(/* webpackChunkName: "catalog" */ '@/views/CatalogView.vue')
      },
      {
        path: '/bom',
        name: 'bom',
        meta: {
          title: 'Stückliste'
        },
        component: () => import(/* webpackChunkName: "bom" */ '@/views/BillOfMaterialsView.vue')
      },
      {
        path: '/protocols',
        name: 'protocols',
        meta: {
          title: 'Protokolle'
        },
        component: () => import(/* webpackChunkName: "protocols" */ '@/views/ProtocolsView.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        meta: {
          title: 'Einstellungen'
        },
        component: () => import(/* webpackChunkName: "bom" */ '@/views/SettingsView.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

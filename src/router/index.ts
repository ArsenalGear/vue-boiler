import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

const authRoutesList = [
  { path: 'about', component: 'AboutPage' },
  { path: 'dashboard', component: 'DashboardPage' },
  { path: 'repositories', component: 'RepositoriesPage' },
  { path: 'NotFoundAuthPage', component: 'NotFoundAuthPage' }
]

const notAuthRoutesList = [
  { path: 'login', component: 'LoginPage' },
  { path: 'NotFoundPage', component: 'NotFoundPage' }
]

const authRoutes = authRoutesList.map((e) => ({
  path: `/${e.path}`,
  name: `${e.path}`,
  component: () => import(`@/views/${e.path}/${e.component}.vue`),
  meta: { requiresAuth: true }
}))

const notAuthRoutes = notAuthRoutesList.map((e) => ({
  path: `/${e.path}`,
  name: `${e.path}`,
  component: () => import(`@/views/${e.path}/${e.component}.vue`)
}))

const routes = [
  ...notAuthRoutes,
  ...authRoutes,
  {
    path: '/',
    redirect: () => {
      if (store.getters['auth/getAuthStatus']) {
        return '/dashboard'
      } else {
        return '/login'
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: () => {
      if (store.getters['auth/getAuthStatus']) {
        return '/NotFoundAuthPage'
      } else {
        return '/NotFoundPage'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthorized = store.getters['auth/getAuthStatus']

  if (to.meta.requiresAuth && !isAuthorized) {
    next('/NotFoundPage')
  } else if (isAuthorized && isNotAuthRoute(to)) {
    next('/NotFoundAuthPage')
  } else {
    next()
  }
})

function isNotAuthRoute(route: any) {
  const notAuthRoutePaths = notAuthRoutesList.map((e) => `/${e.path}`)
  return notAuthRoutePaths.includes(route.path)
}

export default router

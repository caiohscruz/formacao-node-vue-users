import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminAuth from "../middleware/AdminAuth"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/accessdenied',
    name: 'AccessDenied',
    component: () => import('../views/AccessDenied.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    beforeEnter: AdminAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
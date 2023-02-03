import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard.welcome",
        component: () => import("../views/Welcome.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/users",
        name: "dashboard.users",
        component: () => import("../views/Users.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/roles",
        name: "dashboard.roles",
        component: () => import("../views/Roles.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/products",
        name: "dashboard.products",
        component: () => import("../views/Products.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/orders",
        name: "dashboard.orders",
        component: () => import("../views/Orders.vue"),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

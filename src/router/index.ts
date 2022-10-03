import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
    },
    {
      path: "/me",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/credentials",
      name: "credentials",
      component: () => import("../views/CredentialsView.vue"),
    },
  ],
});

export default router;

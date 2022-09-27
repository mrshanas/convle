import { createRouter, createWebHistory } from "vue-router";

import Chat from "../pages/Chat.vue";
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";

const routes: any = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/chat/:id",
    name: "ChatBox",
    component: Chat,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(({ meta, name }) => {
  if (meta.needsAuth) {
    const token = localStorage.getItem("convle_access_token");

    if (token === null && name !== "Home") {
      return { name: "Home" };
    }
  }
});

export default router;

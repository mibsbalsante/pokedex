import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"

import { usePokemonStore, usePokemonActions } from "@str/pokemon"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:name",
      name: "pokemon",
      component: HomeView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
})

router.beforeEach((to, _, next) => {
  if (to.name === "pokemon" && to.params?.name) {
    const { getSearch } = usePokemonActions()

    getSearch(to.params.name)
  } else {
    const { currentResult } = usePokemonStore()
    currentResult.value = null
  }

  next()
})
export default router

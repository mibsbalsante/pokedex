import { ref, computed } from "vue"
import { defineStore, storeToRefs } from "pinia"

import { formatPokemonData } from "@utl/format"
import { saveToStorage, getFromStorage } from "@utl/storage"

const pokemonStore = defineStore("pokemon", () => {
  const list = ref(getFromStorage())
  const isLoading = ref(false)

  const currentSearch = ref("")
  const currentResult = computed(() =>
    list.value.find(({ name }) => name === currentSearch.value)
  )

  function getSearch() {
    if (currentResult.value?.name === currentSearch.value) return

    isLoading.value = true

    fetch(`https://pokeapi.co/api/v2/pokemon/${currentSearch.value}`)
      .then(dt => {
        if (dt.status < 400) return dt.json()
        return dt.text().then(text => {
          throw new Error(text)
        })
      })
      .then(newItem => {
        list.value = [...list.value, formatPokemonData(newItem)]
        saveToStorage(list.value)
      })
      .catch(({ message }) => console.error(message))
      .finally(() => (isLoading.value = false))
  }

  return { list, isLoading, currentSearch, currentResult, getSearch }
})

export const usePokemonStore = () => storeToRefs(pokemonStore())
export const usePokemonActions = () => pokemonStore()

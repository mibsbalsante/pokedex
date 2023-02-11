import { ref, computed } from "vue"
import { defineStore, storeToRefs } from "pinia"

import { formatPokemonData } from "@utl/format"
import { saveToStorage, getFromStorage } from "@utl/storage"

const API_URL = "https://pokeapi.co/api/v2"

const pokemonStore = defineStore("pokemon", () => {
  const list = ref(getFromStorage())
  const isLoading = ref(false)

  const resultFromSearch = ref(null)

  const currentSearch = ref("")
  const currentResult = computed(() =>
    list.value.find(({ name }) => name === currentSearch.value)
  )

  function _handleAPIData(data) {
    if (data.status < 400) return data.json()
    return data.text().then(text => {
      throw new Error(text)
    })
  }

  function getSearch() {
    if (currentResult.value?.name === currentSearch.value) return

    isLoading.value = true

    // -- request pokemon
    fetch(`${API_URL}/pokemon/${currentSearch.value}`)
      .then(_handleAPIData)
      .then(newItem => {
        resultFromSearch.value = newItem
        // -- request species info to get evolution url
        return fetch(`${API_URL}/pokemon-species/${currentSearch.value}`).then(
          dt => dt.json()
        )
      })
      .then(({ evolution_chain }) =>
        // -- request evolution chain
        fetch(evolution_chain.url).then(dt => dt.json())
      )
      .then(evolutionChain => {
        list.value = [
          ...list.value,
          formatPokemonData(resultFromSearch.value, evolutionChain),
        ]
        resultFromSearch.value = null
        saveToStorage(list.value)
      })
      .catch(({ message }) => console.error(message))
      .finally(() => (isLoading.value = false))
  }

  return { list, isLoading, currentSearch, currentResult, getSearch }
})

export const usePokemonStore = () => storeToRefs(pokemonStore())
export const usePokemonActions = () => pokemonStore()

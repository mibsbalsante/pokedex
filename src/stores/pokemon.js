import { ref } from "vue"
import { defineStore, storeToRefs } from "pinia"

import { formatPokemonData } from "@utl/format"
import { saveToStorage, getFromStorage } from "@utl/storage"

const API_URL = "https://pokeapi.co/api/v2"

const pokemonStore = defineStore("pokemon", () => {
  const list = ref(getFromStorage())
  const isLoading = ref(false)

  const resultFromSearch = ref(null)

  const currentSearch = ref("")
  const currentResult = ref(null)

  function _handleAPIData(data) {
    if (data.status < 400) return data.json()
    return data.text().then(text => {
      throw new Error(text)
    })
  }

  function getSearch() {
    const current = list.value.find(({ name }) => name === currentSearch.value)

    if (current) {
      currentResult.value = current
      return
    }

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
        const currentPokemon = formatPokemonData(
          resultFromSearch.value,
          evolutionChain
        )
        list.value = [...list.value, currentPokemon]
        resultFromSearch.value = null
        currentResult.value = currentPokemon
        saveToStorage(list.value)
      })
      .catch(({ message }) => console.error(message))
      .finally(() => (isLoading.value = false))
  }

  return { list, isLoading, currentSearch, currentResult, getSearch }
})

export const usePokemonStore = () => storeToRefs(pokemonStore())
export const usePokemonActions = () => pokemonStore()

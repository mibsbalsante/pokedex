<script setup>
import { computed } from "vue"

import { usePokemonStore, usePokemonActions } from "@str/pokemon"

const { currentSearch, isLoading } = usePokemonStore()
const { getSearch } = usePokemonActions()

const isSubmitEnabled = computed(() => currentSearch.value && !isLoading.value)

const handleSubmit = () => isSubmitEnabled.value && getSearch()
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="search">
      <input type="text" id="search" v-model="currentSearch" />
    </label>
    <button type="submit" :disabled="!isSubmitEnabled">Pesquisar</button>
  </form>
</template>

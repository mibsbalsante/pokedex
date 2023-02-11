<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

import { usePokemonStore } from "@str/pokemon"

const router = useRouter()
const currentSearch = ref("")
const { isLoading } = usePokemonStore()

const isSubmitEnabled = computed(() => currentSearch.value && !isLoading.value)

const handleSubmit = () =>
  isSubmitEnabled.value && router.push(`/${currentSearch.value}`)
</script>

<template>
  <form class="search" @submit.prevent="handleSubmit">
    <label class="search__field" for="search"
      >Pokemon Name
      <input
        class="search__input"
        type="text"
        id="search"
        v-model="currentSearch"
      />
    </label>
    <button class="search__button" type="submit" :disabled="!isSubmitEnabled">
      Search
    </button>
  </form>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 20px 40px;
  width: 100%;
  margin-bottom: auto;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 24px;
    width: 100%;
  }

  &__input,
  &__button {
    width: 100%;
    border-radius: 100px;
    border-width: 1px;
    border-style: solid;
    padding: 8px 24px;
  }
}
</style>

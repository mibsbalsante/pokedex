<script setup>
import { usePokemonStore } from "@str/pokemon"
import pokeTypes from "@utl/pokemon-types"

const { currentResult } = usePokemonStore()
</script>

<template>
  <div
    class="result result--returned"
    v-if="currentResult"
    :style="{
      '--pokemon-color': pokeTypes[currentResult.types[0]],
      '--pokemon-color-2':
        pokeTypes[currentResult.types?.[1] || currentResult.types?.[0]],
    }"
  >
    <div class="result__header">
      <span>#{{ currentResult.id }}</span>
      <h2 class="result__name">{{ currentResult.name }}</h2>
      <span
        class="result__type"
        :style="{ borderColor: pokeTypes[pokeType] }"
        v-for="pokeType in currentResult.types"
        :key="pokeType"
        >{{ pokeType }}</span
      >
    </div>
    <img
      class="result__artwork"
      :src="currentResult.sprites.other['official-artwork'].front_default"
      alt=""
      srcset=""
    />
  </div>
</template>

<style scoped lang="scss">
.result {
  padding: 32px 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding-left: 0;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding-bottom: 16px;

    @include divider {
      bottom: 0;
    }

    span {
      line-height: 1.8;
    }
  }
  &__name {
    margin: 0;
    text-transform: capitalize;
    font-size: 2rem;
    margin-right: auto;
  }
  &__type {
    border-width: 2px;
    border-style: solid;
    padding: 2px 12px 4px;
    border-radius: 100px;
    min-width: 72px;
    text-align: center;
  }

  &__artwork {
    padding: 20px 0;
    max-width: 360px;
    margin: 0 auto;
  }
}
</style>

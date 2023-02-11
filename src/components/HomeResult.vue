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

    <ul class="result__about">
      <li class="result__stat">
        weight <span>{{ currentResult.weight / 10 }}kg</span>
      </li>
      <li class="result__stat">
        height <span>{{ currentResult.height / 10 }}m</span>
      </li>
      <li
        class="result__stat"
        v-for="stat in currentResult.stats"
        :key="stat.name"
      >
        {{ stat.name.replace(/-/g, " ") }} <span>{{ stat.base_stat }}</span>
      </li>
    </ul>
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

  &__about {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px 40px;
    padding-bottom: 32px;

    @include divider {
      bottom: 0;
    }
  }
  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-width: 80px;
    width: 20%;
    text-transform: capitalize;

    span {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 1.4;
    }
  }
}
</style>

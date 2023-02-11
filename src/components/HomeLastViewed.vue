<script setup>
import { RouterLink } from "vue-router"

import { usePokemonStore } from "@str/pokemon"

const { list } = usePokemonStore()
const reverseList = list.value
reverseList.reverse()
</script>

<template>
  <div class="last" v-if="list.length > 0">
    <h2 class="last__title">Last Viewed</h2>

    <nav class="last__list">
      <RouterLink
        class="last__link"
        v-for="item in reverseList"
        :key="item.name"
        :to="`/${item.name}`"
      >
        <img :src="item.sprites.front_default" alt="" />
        <p>{{ item.name }}</p></RouterLink
      >
    </nav>
  </div>
</template>

<style scoped lang="scss">
.last {
  padding: 0 20px 32px;

  &__title {
    margin: 0;
    text-align: center;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__link {
    text-align: center;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--color-green-helper);
    }

    p {
      margin: -12px 0 0;
    }
  }
}
</style>

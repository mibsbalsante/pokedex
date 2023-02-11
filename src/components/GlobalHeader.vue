<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
  <header class="header">
    <RouterLink class="header__link" to="/">
      <h1 class="header__title">My Pokedex</h1>
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--color-green-helper);
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 60px;

  &__link {
    text-decoration: none;
  }

  &__title {
    text-decoration: none;
    font-size: 1.5rem;
    color: var(--color-background);
  }
}
</style>

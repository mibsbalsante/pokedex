<template>
  <header class="header"><h1 class="header__title">My Pokedex</h1></header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--color-green-helper);
  color: var(--color-background);
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 60px;

  &__title {
    font-size: 1.5rem;
  }
}
</style>

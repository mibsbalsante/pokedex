<script setup>
import HomeSearch from "@cmp/HomeSearch.vue"
import HomeResult from "@cmp/HomeResult.vue"
</script>

<template>
  <div class="home">
    <HomeSearch />
    <HomeResult class="home__result" />
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-auto-rows: min-content;

    &__result {
      grid-column: 2;
      grid-row: 1/3;
    }
  }

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
}
</style>

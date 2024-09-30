<!-- pages/home.vue -->
<template>
  <div class="home">
    <h1>Home Page</h1>
    <UButton>
      <NuxtLink to="/special"> Go to special page </NuxtLink>
    </UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

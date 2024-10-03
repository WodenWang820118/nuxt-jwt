<!-- pages/special.vue -->
<template>
  <div class="special">
    <h1>Special Page</h1>
    <p>You have accessed the special page!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['check-access'],
});
</script>
<style scoped>
.special {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

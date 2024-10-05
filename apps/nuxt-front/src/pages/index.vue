<!-- pages/index.vue -->
<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Apply the auth middleware
definePageMeta({
  middleware: ['auth'],
});
</script>

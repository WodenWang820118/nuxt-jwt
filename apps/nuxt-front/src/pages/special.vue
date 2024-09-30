<!-- pages/special.vue -->
<template>
  <div class="special">
    <h1>Special Page</h1>
    <p>You have accessed the special page!</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import { navigateTo } from '#app';

const authStore = useAuthStore();

// On component mount, check authentication
if (!authStore.isAuthenticated()) {
  // If not authenticated, redirect to login
  navigateTo('/login');
}
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

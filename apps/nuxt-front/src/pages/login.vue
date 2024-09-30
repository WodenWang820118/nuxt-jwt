<!-- pages/login.vue -->
<template>
  <div class="login">
    <h1>Login Page</h1>
    <UButton label="Login" @click="handleButtonClick" />
    <!-- <UModal>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Modal Title</h3>
        </template>

        <div class="p-4">
          <p class="mb-4">We're generating a secretphrase.txt</p>
          <p class="mb-4">
            You'll be using the authorized key information within the file
          </p>

          <UButton label="Login" @click="handleButtonClick" />
        </div>
      </UCard>
    </UModal> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(true);

function handleButtonClick() {
  // Simulate first login
  if (authStore.isFirstLogin) {
    authStore.generateSecretPhrase();
    showModal.value = false;
    router.push('/home');
  } else {
    authStore.verifySecretPhrase();
    router.push('/home');
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

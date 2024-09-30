<!-- pages/index.vue -->
<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Home from './home.vue';
import Login from './login.vue';
import { useCookie } from '#app'; // Import useCookie

const router = useRouter();
const currentComponent = ref(null);

const checkAuth = () => {
  const secretPhraseCookie = useCookie('secretPhrase');
  const storedSecretPhrase = secretPhraseCookie.value;
  const hardcodedSecretPhrase = 'yes'; // Replace with your actual value
  console.log('storedSecretPhrase', storedSecretPhrase);

  if (storedSecretPhrase === hardcodedSecretPhrase) {
    currentComponent.value = Home;
    if (router.currentRoute.value.path === '/login') {
      router.push('/home');
    }
  } else {
    currentComponent.value = Login;
    if (router.currentRoute.value.path !== '/login') {
      router.push('/login');
    }
  }
};

onMounted(() => {
  checkAuth();
});

// Apply the auth middleware
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped></style>

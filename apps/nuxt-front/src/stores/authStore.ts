// stores/authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // Use cookies
  const secretPhraseCookie = useCookie('secretPhrase');
  const storedSecretPhrase = useCookie('secretPhraseKey');

  const isFirstLogin = ref(true);
  const secretPhrase = ref(undefined);

  function generateSecretPhrase() {
    // Generate a random secret phrase
    secretPhrase.value = Math.random().toString(36).substring(2, 15);
    isFirstLogin.value = false;

    // Store the secret phrase in a cookie
    secretPhraseCookie.value = secretPhrase.value;
    storedSecretPhrase.value = secretPhrase.value;
  }

  function verifySecretPhrase() {
    // Verify the secret phrase
    return secretPhraseCookie.value === storedSecretPhrase.value;
  }

  function isAuthenticated() {
    // Check if the user is authenticated
    return !!secretPhraseCookie.value;
  }

  return {
    isFirstLogin,
    secretPhrase,
    generateSecretPhrase,
    verifySecretPhrase,
    isAuthenticated,
  };
});

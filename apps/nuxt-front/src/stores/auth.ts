// stores/authStore.ts
import { defineStore } from 'pinia';
import { LoginResponse } from '../server/api/login.post';

export const useAuthStore = defineStore('auth', () => {
  // Use cookies
  // const secretPhraseCookie = useCookie('secretPhrase');
  // const storedSecretPhrase = useCookie('secretPhraseKey');
  const user = ref<User | null>(null);
  const isFirstLogin = ref(true);
  const isAuthenticated = ref(false);
  const secretPhrase = ref(undefined);

  async function login(email: string, password: string) {
    console.log('Logging in...');
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await $fetch<LoginResponse>(`/api/login`, {
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      });
      console.log('Login successful:', response);
      user.value = response.user;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await $fetch<LoginResponse>('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      user.value = null;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async function fetchUser() {
    try {
      const response = await $fetch<LoginResponse>(`/api/login`, {
        credentials: 'include',
      });
      user.value = response.user;
    } catch (error) {
      console.error(error);
      user.value = null;
    }
  }

  function generateSecretPhrase() {
    // Generate a random secret phrase
    // secretPhrase.value = Math.random().toString(36).substring(2, 15);
    // isFirstLogin.value = false;
    // // Store the secret phrase in a cookie
    // secretPhraseCookie.value = secretPhrase.value;
    // storedSecretPhrase.value = secretPhrase.value;
  }

  async function verifySecretPhrase() {
    // const secret = secretPhraseCookie.value;
    // if (secret) {
    //   // Validate the secret phrase
    //   const response = await $fetch<User>(`/api/verify-secret`, {
    //     method: 'POST',
    //     body: { secret },
    //     credentials: 'include',
    //   });
    //   user.value = response;
    //   isFirstLogin.value = false;
    // } else {
    //   throw new Error('Secret phrase not found');
    // }
  }

  return {
    isFirstLogin,
    secretPhrase,
    isAuthenticated,
    user,
    login,
    logout,
    fetchUser,
    generateSecretPhrase,
    verifySecretPhrase,
  };
});

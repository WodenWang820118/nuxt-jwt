import { defineStore } from 'pinia';
import { LoginResponse, LoginCheckResponse } from '../utils/user.interface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isFirstLogin = ref(true);
  const isAuthenticated = ref(false);
  const secretPhrase = ref(undefined);

  async function login(email: string, password: string) {
    try {
      const response = await $fetch<LoginResponse>(`/api/login`, {
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      });
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
      const response = await $fetch<LoginCheckResponse>(`/api/login`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.isLoggedIn && response.user) {
        user.value = response.user;
        isAuthenticated.value = true;
      } else {
        user.value = null;
      }
      return response.isLoggedIn;
    } catch (error) {
      console.error(error);
      user.value = null;
      return false;
    }
  }

  function generateSecretPhrase() {
    // Generate a random secret phrase
    secretPhrase.value = Math.random().toString(36).substring(2, 15);
    isFirstLogin.value = false;
    // Store the secret phrase in a cookie
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
  };
});

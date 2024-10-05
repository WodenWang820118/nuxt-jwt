import { defineStore } from 'pinia';
import { LoginResponse, LoginCheckResponse } from '../utils/user.interface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);

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
        console.log('Fetched User: ', user.value);
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

  function isAuthenticated() {
    return user.value !== null;
  }

  async function isAuthorizedToSpecialPage() {
    return (
      user.value?.rolePermission?.user?.includes('readSpecialPage') ?? false
    );
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
    isAuthorizedToSpecialPage,
  };
});

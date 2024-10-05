export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated()) {
    await authStore.fetchUser();
  }

  if (!authStore.isAuthenticated() && to.path !== '/login') {
    return navigateTo('/login');
  }
});

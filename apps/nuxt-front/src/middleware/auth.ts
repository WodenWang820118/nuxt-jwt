export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log('Checking authentication status:', authStore.isAuthenticated);
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser();
  }

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
});

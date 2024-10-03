// middleware/checkAccess.js
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.fetchUser();

  if (!isAuthenticated) {
    console.log('User is not authenticated');
    return navigateTo('/login'); // Redirect to login page if not authenticated
  }

  // If trying to access the special page, check for specific permission
  if (to.path === '/special') {
    const isAuthorizedToSpecialPage =
      await authStore.isAuthorizedToSpecialPage();

    if (!isAuthorizedToSpecialPage) {
      console.log('User does not have permission to access the special page');
      return navigateTo('/home'); // Redirect to home if not authorized
    }
  }
});

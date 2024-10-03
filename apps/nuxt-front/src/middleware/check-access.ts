// middleware/checkAccess.js
export default defineNuxtRouteMiddleware((to) => {
  const user = useAuthStore().user;
  console.log('User:', user);
  console.log(
    'User Permissions:',
    user.rolePermission.user.includes('readSpecialPage')
  );
  if (
    to.path === '/special' &&
    !user.rolePermission.user.includes('readSpecialPage')
  ) {
    console.log('User does not have permission to access this page');
    return navigateTo('/home');
  }
});

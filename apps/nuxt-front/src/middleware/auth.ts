// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const secretPhraseCookie = useCookie('secretPhrase');
  const storedSecretPhrase = useCookie('secretPhraseKey');
  const hardcodedSecretPhrase = storedSecretPhrase.value;

  console.log('Secret phrase:', secretPhraseCookie.value);
  console.log('Hardcoded secret phrase:', hardcodedSecretPhrase);

  if (
    (to.path !== '/login' &&
      secretPhraseCookie.value !== hardcodedSecretPhrase) ||
    secretPhraseCookie.value === undefined ||
    secretPhraseCookie.value === undefined
  ) {
    return navigateTo('/login');
  }

  if (
    to.path === '/login' &&
    secretPhraseCookie.value === hardcodedSecretPhrase
  ) {
    return navigateTo('/home');
  }

  if (to.path === '/') {
    return navigateTo('/login');
  }
});

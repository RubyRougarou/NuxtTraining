export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, fetch: getUser } = useUserSession();
  await getUser();

  if (!loggedIn.value) {
    return navigateTo("/auth/sign-up");
  }
});

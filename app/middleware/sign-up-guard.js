export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (loggedIn.value && to.fullPath === "/auth/sign-up") {
    return navigateTo("/");
  }
});

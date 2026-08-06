import { defineStore } from "pinia";

export const useAuthStore = defineStore("user", () => {
  //states
  const isLoggedIn = ref(false);
  const user = ref(null);

  // setters

  //actions
  async function login(userData) {
    isLoggedIn.value = true;
    user.value = userData;
  }
  async function logout() {
    const {clear} = useUserSession()
    try {
      await $fetch("/api/auth/log-out")
      await clear();
      isLoggedIn.value = false;
      user.value = null;
      navigateTo("/")
    } catch (error) {
      console.error(error)
    }
  }

  return { isLoggedIn, user, login, logout };
});

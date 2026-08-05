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
  async function logout() {}

  return { isLoggedIn, user, login, logout };
});

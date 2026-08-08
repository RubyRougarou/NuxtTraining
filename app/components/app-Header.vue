<script setup lang="js">
import { useAuthStore } from "~/stores/user.js";

const authStore = useAuthStore();

const { user, loggedIn } = useUserSession();

const items = computed(() => {
  const baseItems = [
    {
      label: "Home",
      to: "/",
      active: false,
    },
  ];

  if (loggedIn.value) {
    baseItems.push({
      label: "Create Event",
      to: "/events/create-event",
      active: false,
    });
  } else {
    baseItems.push({
      label: "Sign up/Log in",
      to: "/auth/sign-up",
      active: false,
    });
  }

  return baseItems;
});
</script>

<template>
  <UHeader>
    <template #title>
      <p class="font-anton text-3xl">EventO</p>
    </template>

    <UNavigationMenu :items="items" />
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <UColorModeButton />
      <div v-show="loggedIn" class="flex items-center gap-2">
        <UButton
          @click.prevent="authStore.logout()"
          variant="ghost"
          class="cursor-pointer"
        >
          Log out
        </UButton>
      </div>
    </template>
  </UHeader>
</template>

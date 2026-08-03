<script setup lang="js">
const items = computed(() => {
  const baseItems = [
    {
      label: "Home",
      to: "/",
      active: false,
    },
  ];

  baseItems.push(
    {
      label: "Create Event",
      to: "/events/create-event",
      active: false,
    },
    { label: "Sign up/Log in", to: "/auth/sign-up", active: false },
  );

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
  </UHeader>
</template>

<script setup lang="js">
import * as yup from "yup";
import { string } from "yup";
import { signUpHelper } from "~/composable/signUpHelper.js";

const type = ref("sign-up");
const loading = ref(false);
const formData = reactive({
  email: "arshia@gmail.com",
  password: "Test1234",
});

const pageTitle = computed(() =>
  type.value === "sign-up" ? "EventO | Sign up" : "EventO | Log in",
);

useSeoMeta({
  title: pageTitle,
});

const schema = yup.object({
  email: string().required("Email is required").email("Invalid Email"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const submitForm = async () => {
  loading.value = true;

  try {
    await signUpHelper(formData, type.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: ["sign-up-guard"],
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton mb-6 text-5xl text-center">
        {{ type === "sign-up" ? "Sign up" : "Log in" }}
      </h1>

      <UForm
        :schema="schema"
        :state="formData"
        @submit.prevent="submitForm"
        class="space-y-4"
      >
        <UFormField label="email" name="email">
          <UInput
            v-model="formData.email"
            placeholder="Enter your Email"
            class="w-full"
          />
        </UFormField>

        <UFormField label="password" name="password">
          <UInput
            v-model="formData.password"
            placeholder="Enter your Password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <div class="flex items-center justify-start">
          <UButton
            icon="i-lucide-arrow-left"
            variant="text"
            color="gray"
            class="cursor-pointer pl-0"
            @click="navigateTo('/')"
            >Go Back</UButton
          >

          <UButton
            type="submit"
            trailing-icon="i-lucide-arrow-right"
            :loading="loading"
            class="cursor-pointer"
            >{{ type === "sign-up" ? "Sign up" : "Log in" }}</UButton
          >
        </div>

        <USeparator />

        <UButton
          icon="mdi:account-alert-outline"
          variant="ghost"
          color="gray"
          class="cursor-pointer pl-0"
          @click="type = type === 'sign-up' ? 'sign-in' : 'sign-up'"
        >
          {{
            type === "sign-up" ? "I want to log in" : "I want to sign up"
          }}</UButton
        >
      </UForm>
    </div>
  </div>
</template>

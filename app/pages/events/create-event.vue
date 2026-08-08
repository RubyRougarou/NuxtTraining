<script setup lang="js">
import * as yup from "yup";
import { format, toDate } from "date-fns";
const toast = useToast();

const loading = ref(false);
const errors = ref([]);
const formData = reactive({
  title: "",
  content: "",
  date: null,
});

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required.")
    .matches(/[A-Za-z\u0600-\u06FF]/, "Content must contain text"),
  content: yup
    .string()
    .required("Text content is required.")
    .matches(/[A-Za-z\u0600-\u06FF]/, "Content must contain text"),
});

const onSubmit = async () => {
  loading.value = true;

  const formattedDate = formData.date
    ? `${formData.date.year}-${String(formData.date.month).padStart(2, "0")}-${String(formData.date.day).padStart(2, "0")}`
    : null;

  try {
    await $fetch("/api/events/event", {
      method: "POST",
      body: {
        ...formData,
        date: formattedDate,
      },
    });

    toast.add({
      title: "Great!",
      description: "Event created successfully.",
      color: "success",
    });

    await navigateTo("/");
  } catch (error) {
    console.error(error);
    if (error?.data?.data) {
      errors.value = error.data.data;
    } else {
      errors.value = [
        error.data.statusMessage || "An error occurred. Please try again.",
      ];
    }
  } finally {
    loading.value = false;
  }
};

useSeoMeta({
  title: "Create a new Event",
});

definePageMeta({
  middleware: ["auth-guard"],
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md text-center p-6">
      <h1 class="font-anton text-2xl font-bold mb-8">Create yo event here!</h1>
      <UForm
        @submit.prevent="onSubmit()"
        :schema="schema"
        :state="formData"
        class="space-y-4"
      >
        <UFormField label="Title" name="title">
          <UInput
            v-model="formData.title"
            placeholder="Enter the title"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Content" name="content">
          <UTextarea
            v-model="formData.content"
            placeholder="Enter Content text..."
            class="w-full"
            autoresize
          />
        </UFormField>

        <UPopover class="w-full">
          <UButton icon="i-lucide-calendar" color="neutral" variant="subtle">{{
            formData.date
              ? format(formData.date, "d MMM, yyyy")
              : "Select a Date"
          }}</UButton>

          <template #content>
            <UCalendar v-model="formData.date" class="p-2" />
          </template>
        </UPopover>

        <div class="flex items-center justify-start">
          <UButton
            icon="i-lucide-arrow-left"
            variant="text"
            color="gray"
            class="cursor-pointer pl-0"
            @click="navigateTo('/')"
            >Go Back</UButton
          >

          <UButton type="submit" :loading="loading" class="cursor-pointer"
            >Create Event</UButton
          >
        </div>

        <div v-show="errors.length" class="mt-4">
          <UBadge
            color="error"
            v-for="(error, index) in errors"
            :key="index + error"
          >
            {{ error }}
          </UBadge>
        </div>
      </UForm>
    </div>
  </div>
</template>

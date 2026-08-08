import { useAuthStore } from "~/stores/user.js";

export const signUpHelper = async (formData, type) => {
  const { fetch: getSession } = useUserSession();
  const toast = useToast();
  const authStore = useAuthStore();
  let response;

  try {
    if (type === "sign-up") {
      response = await $fetch("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
    } else {
      response = await $fetch("/api/auth/sign-in", {
        method: "POST",
        body: formData,
      });
    }

    // pinia here
    if (type === "sign-in") {
      await authStore.login(response.user);
    }

    toast.add({
      title: "Welcome",
      description:
        type === "sign-up"
          ? "Congratulations! Your account is ready."
          : "Welcome back!",
      color: "success",
    });

    await getSession();
    await navigateTo("/");
    return true;
  } catch (error) {
    if (error.statusCode === 400 && error.data?.data) {
      const validationErrors = error.data.data.errorsArray;
      validationErrors.forEach((err) => {
        toast.add({
          title: "Oops",
          description: err,
          color: "error",
        });
      });
    } else {
      toast.add({
        title: "Oops",
        description: error.data?.statusMessage || "Sorry, something happened",
        color: "error",
      });
    }

    return false;
  }
};

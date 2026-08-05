export const signUpHelper = async (formData, type) => {
  const { fetch: getSession } = useUserSession();
  const toast = useToast();
  let response;

  try {
    if (type === "sign-up") {
      await $fetch("/api/auth/sign-up/sign-up", {
        method: "POST",
        body: formData,
      });
    } else {
      // will use pinia later
    }

    // console.log(response.user);
    toast.add({
      title: "Welcome Back",
      description: "Congratulations! Your account is ready.",
      color: "success",
    });

    await getSession();
    await navigateTo("/");
    return true;
  } catch (error) {
    console.error("Error");
    toast.add({
      title: "Oops",
      description: error.data?.statusMessage || "Sorry, something happened",
      color: "error",
    });
    return false;
  }
};

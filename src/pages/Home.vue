<template>
  <div
    class="bg-gray-dark flex flex-col gap-y-10 justify-around items-center min-h-[100vh]"
  >
    <h2 class="text-3xl">
      Welcome to Con<span class="text-orange-500">VLE</span>
    </h2>

    <button
      @click="login"
      class="bg-blue-500 p-3 rounded-md text-2xl font-poppins text-gray-100"
    >
      Continue with Google
    </button>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { googleTokenLogin } from "vue3-google-login";

export default {
  methods: {
    login() {
      googleTokenLogin({
        clientId: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
      }).then((res) => {
        this.authenticate(res.access_token);
      });
    },
    async authenticate(token: string) {
      await this.axios
        .post("/auth/social/google-oauth2/", { access_token: token })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem(
              "convle_access_token",
              JSON.stringify(res.data.access)
            );
            localStorage.setItem(
              "convle_refresh_token",
              JSON.stringify(res.data.refresh)
            );

            this.$router.push("/chat");
          }
        });
    },
  },
};
</script>

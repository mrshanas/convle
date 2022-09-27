<template>
  <div class="bg-gray-dark min-h-[100vh]">
    <h1>ConVLE</h1>

    <button @click="login">Login with Google</button>
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

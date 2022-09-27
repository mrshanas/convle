<template>
  <div class="bg-gray-dark min-h-[100vh]">
    <h1>Home</h1>

    <!-- Temporary Login Form for testing -->
    <form autocomplete="off">
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="bg-inherit outline-none"
        />
      </div>
      <br />
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="bg-inherit outline-none"
        />
      </div>
      <input
        type="submit"
        value="Login"
        @click.prevent="loginUser"
        class="bg-red-500 my-3"
      />
    </form>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async loginUser(e) {
      e.preventDefault();

      const router = this.$router;
      const data = { email: this.email, password: this.password };

      await this.axios.post("/auth/token/", data).then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            "convle_access_token",
            JSON.stringify(res.data.access)
          );
          localStorage.setItem(
            "convle_refresh_token",
            JSON.stringify(res.data.refresh)
          );

          router.push("/chat");
        }
      });

      this.email = "";
      this.password = "";
    },
  },
};
</script>

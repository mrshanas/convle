<template>
  <div class="flex gap-x-4 ml-8 w-[90%] my-6">
    <!-- Sender Image  -->
    <div class="self-start">
      <img
        :src="shanas"
        alt="message"
        class="max-w-[2.65rem] h-[2.65rem] rounded-sm"
      />
    </div>

    <!-- Message body  -->
    <div class="flex flex-col w-full">
      <div class="flex gap-x-5 items-center">
        <h5>{{ username }}</h5>
        <small>{{ serializeTime(createdAt) }}</small>
      </div>

      <p><slot /></p>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import dayjs from "dayjs";

import shanas from "../assets/shanas.jpg";

export default {
  name: "Message",
  props: ["username", "createdAt"],
  data: () => ({
    shanas,
  }),
  methods: {
    serializeTime() {
      const time = dayjs(this.$props.createdAt);

      if (dayjs().format("dddd") === time.format("dddd"))
        return time.format("[Today at] h:mm A");
      else if (+dayjs().format("d") - 1 === +time.format("d"))
        return time.format("[Yesterday at] h:mm A");

      return time.format("dddd [at] h:mm A");
    },
  },
};
</script>

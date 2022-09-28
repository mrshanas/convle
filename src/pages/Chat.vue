<template>
  <!-- Chat Page -->
  <section
    class="grid grid-cols-5 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh]"
  >
    <!-- Side bar -->
    <XMarkIcon
      v-if="isNavOpen"
      class="absolute w-[10%] z-[60] right-0 top-[1%] bg-black-dark lg:hidden p-1 rounded-md"
      @click.prevent="isNavOpen = false"
    />

    <div
      :class="[isNavOpen ? 'showNavbar' : '']"
      class="lg:w-full w-[88%] lg:col-span-1 hidden lg:block transition-all h-full absolute left-0 top-0 z-[60] lg:z-0 lg:relative bg-black-medium"
    >
      <div
        class="flex justify-between h-[3.2rem] px-2 items-center w-full py-3 mx-auto my-2 sticky z-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        <h3 class="font-semibold">Groups</h3>
        <div class="w-[10%]">
          <button
            @click="showModal = !showModal"
            class="w-full inline-flex justify-center items-center text-xl rounded-md bg-gray-dark cursor-pointer"
          >
            &plus;
          </button>
        </div>

        <!-- A modal for adding a Group  -->
        <Modal
          title="New Group"
          :isOpen="showModal"
          :buttonText="buttonText"
          @onClose="onClose"
        >
          <form autocomplete="off" class="w-full flex flex-col gap-y-3">
            <input
              type="text"
              placeholder="Group name"
              v-model="groupName"
              class="outline-none bg-gray-dark p-2 text-white rounded-md focus:outline-none focus:text-white"
            />
            <textarea
              v-model="groupDesc"
              class="outline-none bg-gray-dark p-2 text-white placeholder:text-white rounded-md focus:outline-none focus:text-white"
              cols="30"
              rows="3"
              placeholder="Group description"
            ></textarea>
          </form>
        </Modal>
      </div>

      <!-- Search Bar  -->
      <div
        class="flex w-[90%] mx-auto px-1 my-4 rounded-md gap-x-2 py-2 bg-gray-dark"
      >
        <MagnifyingGlassIcon class="w-[7%] font-extrabold ml-2" />
        <input
          type="search"
          class="bg-inherit placeholder:text-[0.8rem] placeholder:opacity-80 border-none focus:border-none focus:outline-none"
          placeholder="Search"
        />
      </div>

      <!-- Groups -->
      <div class="w-[90%] mx-auto my-2 max-h-[40rem] overflow-y-auto">
        <router-link
          :to="{ name: 'ChatBox', params: { id: group.id } }"
          v-for="group in groups"
          :key="group.id"
          @click="fetchGroup(group.id)"
        >
          <div
            class="my-4 flex items-center gap-x-2 cursor-pointer hover:bg-black-light transition-all hover:rounded-md"
          >
            <div
              class="bg-gray-dark w-[11%] flex justify-center items-center py-1 rounded-md px-2"
            >
              <small class="font-semibold">
                {{ extractFirstLetters(group.name) }}
              </small>
            </div>
            <h2 class="">{{ group.name.toUpperCase() }}</h2>
          </div>
        </router-link>
      </div>

      <!-- User Profile -->
      <div class="absolute bottom-0 bg-black-dark p-3 w-full">
        <div class="flex justify-around">
          <div>
            <img
              :src="shanas"
              alt="mrshanas"
              class="max-w-[1.5rem] rounded-sm"
            />
          </div>
          <h3 class="font-semibold">{{ user?.username }}</h3>
          <ChevronDownIcon class="w-[7%]" />
        </div>
      </div>
    </div>

    <!-- Chat Section -->
    <div class="w-full col-span-5 lg:col-span-4 h-full relative bg-gray-dark">
      <!-- Top Bar  -->
      <div
        class="absolute flex items-center top-0 min-h-[3.7rem] w-full py-3 z-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-inherit"
      >
        <Bars3Icon
          class="w-[7%] ml-2 lg:hidden cursor-pointer"
          @click.prevent="isNavOpen = !isNavOpen"
        />

        <h2
          class="font-semibold text-xl ml-8 cursor-pointer"
          @click="showGrpDesc"
          v-if="selectedGroup !== {}"
        >
          {{ selectedGroup.name }}
        </h2>
        <h2 class="font-semibold text-xl ml-8 cursor-pointer" v-else>ConVLE</h2>

        <!-- Modal for displaying group description  -->
        <Modal
          buttonText="Close"
          title="Group"
          :isOpen="showGroup"
          @onClose="showGrpDesc"
        >
          <div>
            <h3 class="text-white text-2xl my-3">{{ selectedGroup.name }}</h3>
            <p class="text-white my-3">{{ selectedGroup.description }}</p>

            <h5 class="text-white uppercase">Members</h5>
            <div>
              <h6
                class="text-white"
                v-for="member in selectedGroup.members"
                :key="member.id"
              >
                {{ member.username }}
                <small v-if="member.id === user.id">admin</small>
              </h6>
            </div>
          </div>
        </Modal>
      </div>

      <article
        v-if="selectedGroup"
        ref="chatBox"
        class="w-full absolute top-[9%] max-h-[81vh] overflow-auto"
      >
        <!-- Chat Messages  -->
        <Message
          v-for="message in messages"
          :key="message.id"
          :username="message.sent_by"
          :createdAt="message.created_at"
        >
          {{ message.body }}
        </Message>
      </article>

      <article
        class="w-full absolute top-[9%] max-h-[35.5rem] overflow-auto"
        v-else
      >
        <p>Select group to start chatting</p>
      </article>

      <!-- Text Input  -->
      <div class="w-full">
        <form
          autocomplete="off"
          @submit.prevent="sendMessage"
          class="absolute bottom-3 flex rounded-md w-[96%] lg:w-[90%] left-[3%] lg:left-[5%] bg-black-light"
        >
          <input
            type="text"
            ref="input"
            v-model="message"
            placeholder="Type a message here..."
            class="bg-inherit p-3 w-[96%] rounded-md outline-none border-none focus:outline-none"
          />
          <button
            type="submit"
            class="lg:w-[2%] w-[6%] md:w-[4%] mr-2 lg:mr-0 cursor-pointer"
          >
            <PaperAirplaneIcon />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
//@ts-nocheck
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/solid";
import jwtDecode from "jwt-decode";

import Message from "../components/Message.vue";
import Modal from "../components/Modal.vue";
import shanas from "../assets/shanas.jpg";

export default {
  components: {
    Bars3Icon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    Message,
    Modal,
    PaperAirplaneIcon,
    XMarkIcon,
  },
  data: () => ({
    buttonText: "Save",
    groups: [],
    groupDesc: "",
    groupName: "",
    isNavOpen: false,
    message: "",
    messages: [],
    selectedGroup: {},
    shanas,
    showModal: false,
    showGroup: false,
    user: {},
    ws: null,
  }),

  mounted() {
    this.$refs.input.focus();
    this.fetchData();
    this.fetchUser();

    // console.log(import.meta.env.VITE_GOOGLE_OAUTH2_API_SECRET);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    showGrpDesc() {
      this.showGroup = !this.showGroup;
    },
    sendMessage: function (e) {
      e.preventDefault();
      if (!this.message) return;

      this.ws.send(JSON.stringify({ message: this.message }));
      this.message = "";
      let newMessages = this.messages;

      this.ws.onmessage = function (e) {
        const data = JSON.parse(e.data).message;
        newMessages.push(data);
      };

      this.messages = newMessages;
    },
    extractFirstLetters(text: string) {
      const words = text.split(" ");
      if (words.length > 1)
        return words.reduce(
          (prev: string, curr: string): string => prev[0] + curr[0]
        );

      return text[0];
    },
    scrollToBottom() {
      this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
    },

    // ------ asynchronous api calls to the server ------
    async onClose() {
      if (!this.groupName) {
        this.showModal = false;
        return;
      }

      console.log(this.user.id);

      await this.axios
        .post("/chat/groups/", {
          name: this.groupName,
          description: this.groupDesc,
          members: [this.user.id],
        })
        .then((res) => {
          this.buttonText = "Uploading...";

          if (res.status === 201) {
            this.groups.push(res.data);
            this.buttonText = "Save";
            this.showModal = false;
          } else {
            this.buttonText = "Failed, Try Again";
          }

          this.groupName = "";
          this.groupDesc = "";
        });
    },
    async fetchUser() {
      const token = JSON.parse(localStorage.getItem("convle_access_token"));
      const userId = jwtDecode(token).user_id;

      await this.axios.get(`/users/${userId}/`).then((res) => {
        if (res.status === 200) {
          this.user = res.data;
        }
      });
    },
    async fetchGroup(groupId: string) {
      await this.axios.get(`/chat/groups/${groupId}`).then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          this.selectedGroup = res.data;
          this.messages = this.selectedGroup.messages;
        }
      });

      const token = JSON.parse(localStorage.getItem("convle_access_token"));

      this.ws = new WebSocket(
        `ws://localhost:8000/ws/chat/${groupId}/?token=${token}`
      );
    },
    async fetchData() {
      await this.axios.get("/chat/groups/").then((res) => {
        if (res.status === 200) {
          this.groups = res.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.showNavbar {
  display: block;
}
.router-link-active {
  font-weight: 600;
}
</style>

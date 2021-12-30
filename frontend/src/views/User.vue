<template>
  <div class="p-2">
    <div class="text-lg">
      {{ username }}
      <span v-if="user?.type === 'admin' || user?.type === 'editor'">
        <span
          class="py-0.5 px-2 ml-1 rounded-3xl bg-slate-200 text-xs align-center"
        >
          {{ user.type }}
        </span>
      </span>
    </div>
    <div v-if="user" class="mt-1">
      <div>Registered: {{ format(user.createdAt) }}</div>
    </div>
    <div v-if="user && isAdmin" class="mt-1">
      <button
        v-if="user.type === 'user'"
        class="flex mt-2 py-1 px-2 border border-blue-500"
      >
        Make Editor
      </button>
      <button
        v-if="user.type === 'editor'"
        class="flex mt-2 py-1 px-2 border border-blue-500"
      >
        Remove Editor Privileges
      </button>
      <button class="flex mt-2 py-1 px-2 border border-blue-500">
        Delete This User
      </button>
    </div>
  </div>
</template>

<script>
import time from "../utils/time";
export default {
  name: "User",
  components: {},
  data: function () {
    return {
      username: this.$route.params.username,
      user: null,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser", this.username).then((user) => {
        this.user = user;
      });
    },
    format(t) {
      return time.format(t);
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
  },
};
</script>

<style>
</style>

<template>
  <div class="p-2">
    <div>
      <Table :rows="users" :viewFn="viewUser" />
    </div>
  </div>
</template>

<script>
import Table from "../../components/utility/Table.vue";
export default {
  name: "Users",
  components: {
    Table,
  },
  data: function () {
    return {};
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin) {
      this.$router.push({ name: "Home" });
    }
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store.dispatch("getUsers");
    },
    viewUser(user) {
      this.$router.push({ name: "User", params: { username: user.username } });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    users() {
      return this.$store.state.user.users;
    },
  },
};
</script>

<style>
</style>

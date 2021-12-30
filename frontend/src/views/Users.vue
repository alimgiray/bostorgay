<template>
  <div>
    <div>Users</div>
    <div>
      <button>Add new</button>
    </div>
    <div>
      <Table :rows="users" />
    </div>
  </div>
</template>

<script>
import Table from "../components/utility/Table.vue";
export default {
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

<template>
  <div>
    <div>Users</div>
    <div>
      <button>Add new</button>
    </div>
    <div>
      <Table />
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
    return {
      users: [],
    };
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin) {
      this.$router.push({ name: "Home" });
    }
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

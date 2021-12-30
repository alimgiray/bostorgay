<template>
  <table class="w-full overflow-x-auto text-sm md:text-base">
    <thead>
      <td
        v-for="heading in tableHeadings"
        :key="heading"
        class="border py-1 bg-slate-100 text-center"
      >
        {{ heading }}
      </td>
      <td class="border py-1 bg-slate-100 text-center"></td>
    </thead>
    <tr v-for="row in filteredRows" :key="row.id">
      <td
        @click="view(row.id)"
        v-for="key in Object.keys(row)"
        :key="key"
        class="border py-1 text-center"
      >
        {{ row[key] }}
      </td>
      <td class="border py-1">
        <div class="flex justify-around">
          <ChevronDoubleRightIcon
            @click="view(row.id)"
            class="h-4 w-4 md:h-6 md:w-6 text-blue-500"
          />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { ChevronDoubleRightIcon } from "@heroicons/vue/outline";
export default {
  name: "Table",
  components: {
    ChevronDoubleRightIcon,
  },
  props: {
    rows: Array,
    viewFn: Function,
  },
  data: function () {
    return {
      skippedFields: ["createdAt", "updatedAt"],
    };
  },
  mounted() {},
  methods: {
    view(id) {
      this.viewFn.call(this, id);
    },
  },
  computed: {
    filteredRows() {
      return this.rows.map((row) => {
        this.skippedFields.forEach((field) => {
          return delete row[field];
        });
        return row;
      });
    },
    tableHeadings() {
      const firstElement = this.filteredRows[0];
      if (!firstElement) {
        return [];
      }
      return Object.keys(firstElement);
    },
  },
};
</script>

<style scoped>
</style>
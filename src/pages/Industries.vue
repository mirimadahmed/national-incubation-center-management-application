<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div slot="raw-content" class="table-responsive">
          <div v-if="isLoading" class="w-100 text-center p-2">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <paper-table :data="table1.data" :columns="table1.columns" v-else></paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { PaperTable } from "@/components";
const tableColumns = ["Name", "Email", "Type", "Contact"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      isLoading: false,
      table1: {
        title: "Industries",
        subTitle: "industries of the NIC app.",
        columns: [...tableColumns],
        data: []
      }
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await api.users();
      this.isLoading = false;
      this.table1.data = data;
    }
  }
};
</script>
<style>
</style>

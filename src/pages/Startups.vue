<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="row" slot="header">
          <div class="col-md-4">
            <h4 class="card-title">{{table1.title}}</h4>
            <p class="card-category" v-if="table1.subTitle">{{table1.subTitle}}</p>
          </div>

          <div class="col-md-2 ml-auto">
            <p-button round outline block @click.native="$router.push('/new-startup')">Add new</p-button>
          </div>
        </div>
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
const tableColumns = [
  "Name",
  "Cohort",
  "About",
  "Tagline",
  "Status",
  "Industries",
  "Tech",
  "Founders"
];
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
        title: "Startups",
        subTitle: "startups of the NIC app.",
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
      const { data } = await api.startups();
      this.isLoading = false;
      const reducer = (accumulator, currentValue) =>
        accumulator.name + ", " + currentValue.name;
      data.forEach(item => {
        item.industries = item.industries.reduce(reducer);
        item.tech = item.tech.reduce(reducer);
        item.founders = item.founders.reduce(reducer);
      });
      this.table1.data = data;
    }
  }
};
</script>
<style>
</style>

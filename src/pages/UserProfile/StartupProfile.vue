<template>
  <card class="card" title="Startup Profile">
    <div v-if="isLoading" class="w-100 text-center p-2">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent>
        <div class="row" v-if="error.length > 0">
          <div class="col-md-12">
            <div class="form-group">
              <label class="control-label">Error</label>
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center" v-if="user.logo.length > 0">
            <div class="w-25 m-auto">
              <img
                :src="`/logos/${user.logo}`"
                class="rounded img-fluid"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Startup Logo</label>
              <input class="form-control" type="file" @change="onLogoPicked" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="Startup" placeholder="Name" v-model="user.name"></fg-input>
          </div>
          <div class="col-md-8">
            <fg-input type="text" label="Tagline" placeholder="One liner" v-model="user.tagline"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label class="control-label">Cohort</label>
              <select v-model="user.cohort" class="form-control">
                <option
                  v-for="cohort in cohorts"
                  :key="cohort.id"
                  :value="cohort.id"
                >{{ cohort.name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="control-label">Status</label>
              <select v-model="user.status" class="form-control">
                <option v-for="(status, i) in statuses" :key="i" :value="status">{{ status }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Company Website"
              placeholder="Website URL"
              v-model="user.website"
            ></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Company LinkedIn"
              placeholder="LinkedIn URL"
              v-model="user.linkedin"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Company Facebook"
              placeholder="Facebook URL"
              v-model="user.facebook"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Company Instagram"
              placeholder="Instagram username"
              v-model="user.instagram"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Company Twitter"
              placeholder="Twitter username"
              v-model="user.twitter"
            ></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Description about the startup."
                v-model="user.about"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Techs {{selectedTechs}}</label>
              <div class="col-md-12">
                <div class="form-check" v-for="(tech, i) in techs" :key="i">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="tech"
                    :id="tech.name"
                    v-model="user.technologies"
                  />
                  <label class="form-check-label" :for="tech.name">{{ tech.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Industries {{selectedIndustries}}</label>
              <div class="col-md-12">
                <div class="form-check" v-for="(industry, i) in industries" :key="i">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="industry"
                    :id="industry.name"
                    v-model="user.industries"
                  />
                  <label class="form-check-label" :for="industry.name">{{ industry.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-for="(field, i) in user.founders" :key="i">
          <div class="col-md-2">
            <fg-input type="text" placeholder="Name" v-model="user.founders[i].name"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text" placeholder="Designation" v-model="user.founders[i].designation"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" placeholder="Email" v-model="user.founders[i].email"></fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text" placeholder="LinkedIn" v-model="user.founders[i].linkedin"></fg-input>
          </div>
          <div class="col-md-2">
            <p-button type="info" round @click.native.prevent="deleteFounder(i)">Delete Founder</p-button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <p-button type="info" round @click.native.prevent="addFounder">Add Founder</p-button>
          </div>
          <div class="col-md-6 text-right">
            <p-button type="info" round @click.native.prevent="addStartup">{{buttonText}}</p-button>
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      id: this.$route.query.id,
      isLoading: false,
      error: "",
      logoFile: null,
      techs: [],
      industries: [],
      statuses: [
        "Incubated",
        "Graduated",
        "Terminated",
        "Shelfed",
        "Warning 1",
        "Warning 2",
        "Warning 3"
      ],
      cohorts: [
        {
          name: "Cohort 1",
          id: 1
        },
        {
          name: "Cohort 2",
          id: 2
        },
        {
          name: "Cohort 3",
          id: 3
        },
        {
          name: "Cohort 4",
          id: 4
        },
        {
          name: "Cohort 5",
          id: 5
        },
        {
          name: "Cohort 6",
          id: 6
        },
        {
          name: "Cohort 7",
          id: 7
        },
        {
          name: "Cohort 8",
          id: 8
        }
      ],
      user: {
        name: "",
        about: "",
        tagline: "",
        cohort: "",
        website: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        twitter: "",
        technologies: [],
        industries: [],
        founders: [],
        logo: ""
      }
    };
  },
  created() {
    this.fetch();
  },
  computed: {
    buttonText() {
      return this.id === undefined ? "Create Startup" : "Save Startup";
    },
    selectedTechs() {
      if (this.user.technologies.length === 0) {
        return "(Select all that apply)";
      } else {
        return this.user.technologies.map(tech => tech.name).join(", ");
      }
    },
    selectedIndustries() {
      if (this.user.industries.length === 0) {
        return "(Select all that apply)";
      } else {
        return this.user.industries.map(industry => industry.name).join(", ");
      }
    }
  },
  methods: {
    addFounder() {
      this.user.founders.push({
        name: "",
        designation: "",
        email: "",
        linkedin: ""
      });
    },
    async deleteFounder(i) {
      if (this.id === undefined) this.user.founders.splice(i, 1);
      else {
        this.isLoading = true;
        const { data } = await api.deleteFounder(this.user.founders[i].id);
        if (data.error === 0) {
          this.$notify({
            message: "Founder deleted.",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success"
          });
          this.user.founders.splice(i, 1);
        } else {
          this.$notify({
            message: "Cannot delete founder.",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        }
        this.isLoading = false;
      }
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await api.techs();
      this.techs = data;
      this.fetchOther();
    },
    async fetchOther() {
      const { data } = await api.industries();
      this.industries = data;
      this.isLoading = false;
      if (this.id !== undefined) this.fetchStartup();
    },
    async fetchStartup() {
      this.isLoading = true;
      const { data } = await api.getStartup(this.id);
      console.log(data);
      this.user = data;
      this.isLoading = false;
    },
    async addStartup() {
      if (this.user.name.length === 0) {
        this.$notify({
          message: "Name must be added",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
        return;
      } else if (this.user.logo.length === 0) {
        this.$notify({
          message: "Upload the logo first",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
        return;
      } else if (this.user.founders.length === 0) {
        this.$notify({
          message: "Add one founder atleast.",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
        return;
      }
      this.isLoading = true;
      if (this.id === undefined) {
        const { data } = await api.create(this.user);
        this.isLoading = false;
        if (data.error === 1) {
          this.error = data.message;
        } else {
          this.$router.push("/");
        }
      } else {
        const { data } = await api.updateStartup(this.user);
        this.isLoading = false;
        if (data.error === 1) {
          this.error = data.message;
        } else {
          this.$notify({
            message: "Startup updated.",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success"
          });
        }
      }
    },
    async onLogoPicked() {
      this.isLoading = true;
      const files = event.target.files;
      this.logoFile = files[0];
      let target = new FormData();
      target.append("logoFile", this.logoFile);
      const { data } = await api.addLogo(target);
      this.isLoading = false;
      if (data.error === 0) {
        this.user.logo = data.logo;
      } else {
        this.error = data.message;
      }
    }
  }
};
</script>
<style>
</style>

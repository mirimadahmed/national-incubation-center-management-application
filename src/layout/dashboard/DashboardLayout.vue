<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/startups" name="Startups" icon="ti-view-list-alt"/>
        <sidebar-link to="/users" name="Users" icon="ti-user"/>
        <sidebar-link to="/industries" name="Industries" icon="ti-settings"/>
        <sidebar-link to="/technologies" name="Technologies" icon="ti-settings"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>

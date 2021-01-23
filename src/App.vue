<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <div v-if="loading" class="w-100 text-center p-2">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <notifications></notifications>
      <div id="login" v-if="!authenticated">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from "@/api";
export default {
  name: "Login",
  computed: {
    ...mapState([
      'authenticated',
    ])
  },
  mounted() {
    if(localStorage.getItem('authenticated') === 'yes') {
      this.$store.commit('login')
    }
  },
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async login() {
      if (this.input.username != "" && this.input.password != "") {
        this.loading = true;
        const { data } = await api.login(
          this.input.username,
          this.input.password
        );
        this.loading = false;
        if (data.error === 1) {
          this.$notify({
            message: data.message,
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
        } else {
          this.$store.commit('login')
        }
      } else {
        this.$notify({
          message: "A username and password must be present.",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>

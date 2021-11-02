<template>
  <div>
    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <ErrorNotification :msgError="msgError" />

        <label for="email">E-mail</label>
        <input type="email" placeholder="Informe seu melhor e-mail" id="email" class="input" v-model="email" />
        <label for="password">Senha</label>
        <input type="password" placeholder="Informe sua senha" id="password" class="input" v-model="password" />
        <br />
        <button class="button is-success" @click="login()">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        password: "",
        email: "",
        msgError: ""
      };
    },
    methods: {
      login() {
        axios
          .post(`${process.env.VUE_APP_API}/login`, {
            password: this.password,
            email: this.email,
          })
          .then((res) => {
            localStorage.setItem('token', res.data);
            this.$router.push({
              name: 'Home'
            });
          })
          .catch((err) => {
            this.msgError = err.response.data;
          });
      },
    },
    components: {
      ErrorNotification: () => import('../components/ErrorNotification.vue'),
    }
  };
</script>

<style scoped>
</style>
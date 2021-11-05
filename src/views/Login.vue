<template>
  <div>
    <NavBar />

    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <ErrorNotification :msgError="msgError" />

        <label for="email">E-mail</label>
        <input
          type="email"
          placeholder="Informe seu melhor e-mail"
          id="email"
          class="input"
          v-model="email"
        />
        <label for="password">Senha</label>
        <input
          type="password"
          placeholder="Informe sua senha"
          id="password"
          class="input"
          v-model="password"
        />
        <br />
        <p>
          Se ainda não possui cadastro,
          <router-link to="/register">clique aqui</router-link>
        </p>
        <p><a @click="recoverPassword()">Esqueci minha senha</a></p>
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
      msgError: "",
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
          localStorage.setItem("token", res.data);
          this.$router.push(
            {
              name: "RestrictArea",
            }
          );
        })
        .catch((err) => {
          this.msgError = err.response.data;
        });
    },
    recoverPassword() {
      if (this.email == "") {
        this.msgError = "Favor, informe um e-mail válido";
      } else {
        axios.post(`${process.env.VUE_APP_API}/recover-password`, {
          email: this.email,
        }).then(res =>{
          alert(res.data);
        }).catch(err=>{
          this.msgError = err.response.data;
        })
      }
    },
  },
  components: {
    ErrorNotification: () => import("../components/ErrorNotification.vue"),
    NavBar: () => import("../components/NavBarExternal.vue")
  },
};
</script>

<style scoped>
</style>
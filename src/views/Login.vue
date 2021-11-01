<template>
  <div>
    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="notification is-danger" v-show="msgError!=''">
          <button class="delete" @click="closeNotification()"></button>
          {{msgError}}
        </div>
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
        <button class="button is-success" @click="login()">Cadastrar</button>
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
        .post("http://localhost:8686/login", {
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          alert(res.data);
          this.$router.push({name: 'Home'});
        })
        .catch((err) => {
          this.msgError = err.response.data;
        });
    },
    closeNotification(){
        this.msgError = '';
    }
  },
};
</script>

<style scoped>
</style>
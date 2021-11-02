<template>
  <div>
    <h2>Registro de Usuário</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <ErrorNotification :msgError="msgError" />
        <label for="name">Usuário</label>
        <input type="text" placeholder="Informe o nome de usuário" id="name" class="input" v-model="name" />
        <label for="email">E-mail</label>
        <input type="email" placeholder="Informe seu melhor e-mail" id="email" class="input" v-model="email" />
        <label for="password">Senha</label>
        <input type="password" placeholder="Informe sua senha" id="password" class="input" v-model="password" />
        <label for="confirmpassword">Confirme a senha</label>
        <input type="password" placeholder="Repita sua senha" id="confirmpassword" class="input"
          v-model="confirmpassword" />
        <br />
        <button class="button is-success" @click="register()">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        name: "",
        password: "",
        confirmpassword: "",
        email: "",
        msgError: ""
      };
    },
    methods: {
      register() {
        if (this.password != this.confirmpassword) {
          this.msgError = "Senhas não conferem";
          return;
        }
        axios
          .post(`${process.env.VUE_APP_API}/user`, {
            name: this.name,
            password: this.password,
            email: this.email,
          })
          .then((res) => {
            alert(res.data);
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
      ErrorNotification: () => import('../components/ErrorNotification.vue')
    }
  };
</script>

<style scoped>
</style>
<template>
  <div>
    <NavBar />

    <h2>Redefina sua senha</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <ErrorNotification :msgError="msgError" />

        <label for="password">Nova Senha</label>
        <input type="password" placeholder="Informe sua senha" id="password" class="input" v-model="password" />
        <label for="confirmpassword">Confirme a senha</label>
        <input type="password" placeholder="Repita sua senha" id="confirmpassword" class="input"
          v-model="confirmPassword" />
        <br />
        <button class="button is-success" @click="redefinePassword()">Atualizar senha</button>
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
        confirmPassword: "",
        msgError: "",
        token: ""
      };
    },
    methods: {
      redefinePassword() {
        if (this.password != this.confirmPassword) {
          this.msgError = "Senhas não conferem";
          return;
        }
        axios.put(`${process.env.VUE_APP_API}/redefine-password`, {
          password: this.password,
          token: this.token
        }).then(res => {
          alert(res.data);
          this.$router.push({
            name: "Login"
          })
        }).catch(err => {
          this.msgError = err.response.data;
        })
      },
    },
    components: {
      ErrorNotification: () => import("../components/ErrorNotification.vue"),
    },
    created() {
      this.token = this.$route.params.token;
      if (this.token == undefined) {
        this.$router.push({
          name: "Home"
        })
      } else {
        axios.post(`${process.env.VUE_APP_API}/validate-password-token`, {
          token: this.token
        }).then(res => {
          console.log(res.data)
        }).catch(err => {
          alert(err.response.data);
          this.$router.push({
            name: "Home"
          })
        })
      }
    }
  };
</script>

<style scoped>
</style>
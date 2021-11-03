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
                <br />
                <button class="button is-success" @click="updateUser()">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                id: "",
                name: "",
                email: "",
                msgError: ""
            };
        },
        methods: {
            updateUser() {
                axios
                    .put(`${process.env.VUE_APP_API}/user`, {
                        id: this.id,
                        name: this.name,
                        email: this.email,
                    },{
                        headers: this.headers
                    })
                    .then((res) => {
                        alert(res.data);
                        this.$router.push({
                            name: 'Users'
                        });
                    })
                    .catch((err) => {
                        this.msgError = err.response.data;
                    });
            },

        },
        components: {
            ErrorNotification: () => import('../components/ErrorNotification.vue')
        },
        created() {
            axios.get(`${process.env.VUE_APP_API}/user/${this.$route.params.id}`, {
                headers: this.headers
            }).then(res => {
                this.id = res.data.id;
                this.name = res.data.name;
                this.email = res.data.email;
            }).catch(err => {
                alert(err.response.data);
                this.$router.push({
                    name: "Home"
                });
            })
        }
    };
</script>

<style scoped>
</style>
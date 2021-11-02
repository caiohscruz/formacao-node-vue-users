<template>
    <div>
        <h2>Gerenciamento de Usuários</h2>
        <hr />
        <div class="columns is-centered">
            <div class="column is-half">
                <ErrorNotification :msgError="msgError" />

                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index">
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.role | processRole}}</td>
                            <td>
                                <button class="button is-warning" @click="editUser(user.id)">Editar</button>
                                <button class="button is-danger" @click="deleteUser(user.id)">Deletar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                users: [],
                msgError: '',
            }
        },
        created() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.get(`${process.env.VUE_APP_API}/users`, req).then(res => {
                this.users = res.data;
            }).catch(err => {
                this.msgError = err.response.data;
            })
        },
        components: {
            ErrorNotification: () => import('../components/ErrorNotification.vue')
        },
        methods: {
            editUser(id) {
                alert("Editanto o usuário " + id)
            },
            deleteUser(id) {
                alert("Deletando o usuário " + id)
            },
        },
        filters: {
            processRole: function (value) {
                if (value == 0) {
                    return "Usuário comum"
                } else {
                    return "Administrador"
                }
            }
        }
    }
</script>

<style>

</style>
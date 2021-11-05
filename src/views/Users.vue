<template>
    <div>
        <NavBar />

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
                                <router-link :to="{name:'UserEdit', params:{id: user.id}}"><button
                                        class="button is-warning">Editar</button></router-link>
                                <button class="button is-danger" @click="openModal(user.id)">Deletar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div :class="{'modal':true, 'is-active': showModal}">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    Atenção
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="content">
                                    Você quer realmente deletar este usuário?
                                </div>
                            </div>
                            <footer class="card-footer">
                                <a href="#" class="card-footer-item" @click="closeModal()">Cancelar</a>
                                <a href="#" class="card-footer-item" @click="deleteUser(userToDelete)">Sim, deletar</a>
                            </footer>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                users: [],
                msgError: '',
                showModal: false,
                userToDelete: -1
            }
        },
        created() {
            axios.get(`${process.env.VUE_APP_API}/users`, {
                headers: this.headers
            }).then(res => {
                this.users = res.data;
            }).catch(err => {
                this.msgError = err.response.data;
            })
        },
        components: {
            ErrorNotification: () => import('../components/ErrorNotification.vue'),
            NavBar: () => import("../components/NavBarInternal")
        },
        methods: {
            deleteUser() {
                axios.delete(`${process.env.VUE_APP_API}/user/${this.userToDelete}`, {
                    headers: this.headers
                }).then(res => {
                    alert(res.data);
                    this.users = this.users.filter(u => u.id != this.userToDelete);
                    this.closeModal();
                }).catch(err => {
                    alert(err.response.data);
                    this.closeModal();
                })
            },
            openModal(id) {
                this.showModal = true;
                this.userToDelete = id;
                console.log(this.userToDelete)
            },
            closeModal() {
                this.showModal = false;
                this.userToDelete = -1;
            }
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
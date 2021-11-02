<template>
    <div class="notification is-danger" v-show="msgError!=''">
        <button class="delete" @click="closeNotification()"></button>
        {{msgError}}
    </div>
</template>

<script>
    export default {
        props: {
            msgError: String
        },
        methods: {
            closeNotification() {
                this.$parent.$data.msgError = '';
            }
        }
    }
</script>

<style>

</style>
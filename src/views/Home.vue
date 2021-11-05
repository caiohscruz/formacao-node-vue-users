<template>
  <div class="home">
    <NavBar />
    HomePage
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components:{
      NavBar: () => import("../components/NavBarExternal.vue")
    }
  }
</script>
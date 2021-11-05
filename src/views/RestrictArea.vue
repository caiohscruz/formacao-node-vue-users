<template>
  <div>
    <NavBar />

    <h1>Bem-vindo à sua área restrita</h1>
  </div>
</template>

<script>
  export default {
    components:{
      NavBar: () => import("../components/NavBarInternal")
    }
  }
</script>

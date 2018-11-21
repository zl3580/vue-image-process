<template>
  <div id="app">  
    <imageprocess></imageprocess>
  </div>
</template>

<script>
export default {
  name: 'app',
   mounted () {
    console.log(this.$msg)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

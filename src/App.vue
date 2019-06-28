<template>
  <div id="app">
    <loading v-show="$store.state.loading" :full-page="true"/>
    <router-view/>
  </div>
</template>
<script>
import loading from './components/Loading'
export default {
  components: {
    loading
  }
}
</script>

<style>
@import url('./assets/index.scss');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

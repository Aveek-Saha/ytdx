<template>
  <div id="app">
    <div class="container">
      <landing-page></landing-page>
    </div>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css' 

  export default {
    name: 'ymusic',
    components: {
      LandingPage
    }
  }
</script>

<style>
  /* CSS */
  
</style>

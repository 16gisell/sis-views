<template>
  <div id="app">
      <router-view name="header"></router-view>
      <main class="main">
          <!-- <fade-transition origin="center" mode="out-in" :duration="250"> -->
              <router-view/>
          <!-- </fade-transition> -->
      </main>
      <router-view name="footer"></router-view>
  </div>
</template>
<script>
// import { FadeTransition } from "vue2-transitions";

export default {
components: {
  // FadeTransition
}
};
</script>
  <style>
  .main{
    width: auto;
    height: 200vh;
  }

  section{
    width: auto !important;
    height: 100vh !important;
  }
</style>

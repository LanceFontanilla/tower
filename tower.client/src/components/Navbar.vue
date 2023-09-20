<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black d-flex justify-content-between px-3">
    <router-link class="navbar-brand " :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1">
          <img alt="logo" src="../assets/img/T.png" height="55" />ower</span>
      </div>
    </router-link>
    <div class="text-end">
      <Login />
    </div>

  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>

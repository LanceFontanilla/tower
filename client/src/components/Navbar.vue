<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black d-flex justify-content-between px-3 pt-0">
    <router-link class="navbar-brand " :to="{ name: 'Home' }">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="fs-2 ">
          <img alt="logo" src="../assets/img/T.png" height="40" />ower</span>
      </div>
    </router-link>

    <ModalWrapper id="create-event" v-if="user.isAuthenticated">
      <template #button>
        <i class="mdi mdi-plus-box"></i> Create Event
      </template>

      <template #body>
        <EventForm/>
      </template>
    </ModalWrapper>

    <div class="text-end">
      <Login />
    </div>

  </nav>
</template>

<script>
import Login from './Login.vue';
import ModalWrapper from '../components/ModalWrapper.vue'
import { AppState } from '../AppState';
import { computed } from 'vue';

export default {
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  },
  components: { Login, ModalWrapper }
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

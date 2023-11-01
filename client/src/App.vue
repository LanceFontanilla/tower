<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-dark text-light">
    <p>
      Made with <img class="icon" src="https://static.vecteezy.com/system/resources/previews/020/967/309/original/red-blood-icon-free-png.png" alt=""> and <span class="mdi mdi-emoticon-cry-outline"></span> from Evo
    </p>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

main{
  background-color: rgba(42, 45, 58, 1);
}

.icon{
  height: 10px;
  width: 10px;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

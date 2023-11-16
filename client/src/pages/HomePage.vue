<template>
<div class="container">
  <section class="row">
    <div class="header-card d-flex align-items-center mb-4">
      <p class="ms-3 fs-5">Get ahead of the scalpers. Reserve your seat now with real events for real people!</p>
      
    </div> 
  </section>


  <section class="row bg-light-purple gap-2 p-2 rounded my-2">

    <button class="btn col btn-outline-light" @click="filterBy = ''">All</button>
    <button class="btn col btn-outline-light" @click="filterBy = 'concert'">Concerts</button>
    <button class="btn col btn-outline-light" @click="filterBy = 'convention'">Conventions</button>
    <button class="btn col btn-outline-light" @click="filterBy = 'sport'">Sports</button>
    <button class="btn col btn-outline-light" @click="filterBy = 'digital'">Digital</button>

    
  </section>

  <section class="row g-4 mt-3">

    <div v-for="e in events" :key="e.id" class="col-6 col-md-3">
      <EventCard :event="e"/>
    </div>

  </section>

</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import EventCard from '../components/EventCard.vue'
import { AppState } from '../AppState.js';




export default {
  setup() {
    onMounted(() => {
      getEvents();
    });
    const filterBy = ref('')
    async function getEvents(){
      try{
        await eventsService.getEvents();
      }
      catch (error){
        Pop.error(error)
      }
    }

    return {
      filterBy,
      events: computed(() => {
        if(!filterBy.value){
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      }),
      
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">

.header-card{
  height: 30vh;
  background-image: url(https://png.pngtree.com/background/20230410/original/pngtree-empty-auditorium-with-seats-before-the-start-of-the-performance-photo-picture-image_2382018.jpg);
  background-position: center;
  background-size: cover;
  border: solid white 1px;
  border-radius: 10px;
  color: white;
}

.bg-light-purple{
  background-color: rgba(71, 76, 97, 1) 
}

.cover-img{
  background-image: v-bind(coverImg);
  min-height: 40vh;
  background-position: center;
  background-size: cover;
}
</style>

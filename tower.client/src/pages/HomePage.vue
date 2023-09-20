<template>
<div>
  Home Page
  <div v-for="e in events" :key="e.id">
    <EventCard :event="e"/>
  </div>

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


</style>

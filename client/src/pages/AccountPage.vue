<template>

  <div class="container-fluid text-light">
    <section class="row mt-4">
      <div class="col-12 col-md-3 bg-dark p-3 text-center">
        <h3>Welcome {{ account.name }}</h3>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>

      <div class="col-12 col-md-9 bg-dark p-3">
        <div>
          <h1>Your Tickets to Events</h1>
        </div>
        <div v-for="t in tickets" :key="t.id" class="my-3 card bg-purple-light">
          <router-link style="text-decoration: none; color:black" :to="{ name: 'Event Details', params: { eventId: t.event.id } }">
          <div class="row d-flex justify-content-between align-items-center p-3">
            <div class="col-12 col-md-2"><img :src="t.event.coverImg" alt="" class="img-fluid rounded"></div>
            <div class="col-12 col-md-5">
              <p class="m-0 ">{{ t.event.name }}</p>
              <p class="m-0">{{ t.event.location }}</p>
            </div>
            <div class="col-12 col-md-4">
              <h4>
                Click for details!
              </h4>
            </div>
          </div>
        </router-link>
        </div>
      </div>
    </section>  
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';



export default {
  setup() {

    onMounted(() => {
      getEvents()
      getTicketsByAccount()


    })
  

    async function getTicketsByAccount(){
      try {
        await eventsService.getTicketsByAccount()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    
    return {
      getTicketsByAccount,

      getEvents,
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myEvents),
      events: computed(() =>  AppState.events),
    }
  },

}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bg-purple-light{
    background-color: rgb(127, 158, 225) 
}

</style>

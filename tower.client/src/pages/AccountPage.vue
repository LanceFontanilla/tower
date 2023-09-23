<template>

  <div class="container-fluid text-light">
    <section class="row mt-4">
      <div class="col-12 col-md-3 bg-dark p-3 text-center">
        <h3>Welcome {{ account.name }}</h3>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-12 col-md-9 bg-dark p-3">
        <div v-for="t in tickets" :key="t.id">
          {{ t.eventId }}
        </div>
      </div>
    </section>  
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import EventCard from '../components/EventCard.vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';



export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getTicketsByAccount()
    })
  

    async function getTicketsByAccount(){
      try {
        let ticketData = { eventId: route.params.eventId }
        await eventsService.getTicketsByAccount(ticketData)
        logger.log('getting my tickets', ticketData)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      getTicketsByAccount,
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),
      
    }
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

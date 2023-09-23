<template>
  <router-link style="text-decoration: none; color:black" :to="{ name: 'Event Details', params: { eventId: event.id } }">
    <div class="cover-img card bg-purple-light">
        <img :src="event.coverImg" alt="" class="img-fluid rounded">
        <div class="p-0 ms-2 mt-2">
        <p  class="fw-bold mb-0">{{ event.name }}</p>
        </div>
        <div class="">
          <p class="p-0 ms-2 mb-0">{{ event.location }}</p>
        </div>
        <div class="">
          <p class="p-0 ms-2 mb-0">{{ event.startDate }}</p>
        </div>
        <div v-if="event.isCanceled" class="bg-red text-light text-center">
          <p class="p-0 ms-2 mb-0">Canceled</p>
        </div>
      </div>
    </router-link>
    </template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';


import { Event } from '../models/Event.js'

export default {
    props: {event: {type: Event, required: true}},
    setup(){
    return { 
    coverImg: computed(() => `url(${AppState.events?.coverImg})`),
    totalCapacity: computed(() => event.capacity - event.ticketCount)
    }
    }
};
</script>


<style lang="scss" scoped>

.cover-img{
  width: 100%;
  
  background-position: center;
  background-size: cover;
}

.event-card{
  height: 65vh;
  background-color: rgb(180, 192, 242); ;
}




.bg-light-purple{
    background-color: rgba(71, 76, 97, 1) 
}

.bg-dark-purple{
    background-color: rgb(36, 40, 57) 
}

.bg-purple{
    background-color: rgb(107, 111, 234) 
}

.bg-purple-light{
    background-color: rgb(127, 158, 225) 
}

.bg-red{
  background-color: rgb(196, 34, 34) ;
}

.convo-text{
    color:  rgb(127, 158, 225) 
}

.convo-box{
    color: rgb(180, 192, 242); 
}

.submit-button{
    background-color: rgb(180, 192, 242); 
    color: black
}
</style>
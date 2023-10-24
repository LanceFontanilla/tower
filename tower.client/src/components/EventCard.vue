<template>
  <router-link style="text-decoration: none; color:black" :to="{ name: 'Event Details', params: { eventId: event.id } }">
    <div class="cover-img event-card bg-purple-light  d-flex align-items-end">

        <div class="text-wrapper">
          <div class="p-0 ms-2 mt-2">
            <p  class="fw-bold mb-0">{{ event.name }}</p>
          </div>
          <div class="">
            <p class="p-0 ms-2 mb-0">{{ event.location }}</p>
          </div>
          <div class="">
            <div class="">
              <p class="p-0 ms-2 mb-0">{{ event.startDate }}</p>
            </div>
            <div class="text-end me-3">
              <span class="text-light-blue">{{ spotsLeft }}</span>
              <span class=""> spots left</span>
            </div>
          </div>
          <div v-if="event.isCanceled" class="tower-bg-danger text-light text-center">
            <p class="p-0 ms-2 mb-0">Canceled</p>
          </div>
        </div>

      </div>
    </router-link>
    </template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';


import { Event } from '../models/Event.js'

export default {
    props: {event: {type: Event, required: true}},
    setup(props){

    return { 
    coverImg: computed(() => `url('${props.event.coverImg}')`),
    spotsLeft: computed(() => (props.event.capacity - props.event.ticketCount))
    }
    }
};
</script>


<style lang="scss" scoped>

.cover-img{
  width: 100%;
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
}

.event-card{
  height: 45vh;
  background-color: rgb(180, 192, 242); ;
  color: white;
  backdrop-filter: blur;
}

.text-wrapper{
   backdrop-filter: blur(15px);
   width: 100%;
   height: 18vh;
}

.tower-bg-danger{
  background-color: rgba(255, 89, 119, 1);
;
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

.text-light-blue{
  color: rgba(86, 199, 251, 1);

}
</style>
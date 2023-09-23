<template>
  <router-link style="text-decoration: none; color:black" :to="{ name: 'Event Details', params: { eventId: event.id } }">
    <div class="cover-img card">
     <img :src="event.coverImg" alt="" class="img-fluid rounded">
      <div class="p-2 ms-2 mt-2">
        <p>{{ event.name }}</p>
        <p>{{ event.location }}</p>
        <p>{{ event.startDate }}</p>
      </div>
    </div></router-link>
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
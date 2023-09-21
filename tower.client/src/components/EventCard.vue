<template>
  <router-link style="text-decoration: none; color:black" :to="{ name: 'Event Details', params: { eventId: event.id } }">
    <div class="card event-img ">
      <img class="img-fluid" :src="event.coverImg" alt="">
      <div>
        <p>{{ event.name }}</p>
        <p>{{ event.location }}</p>
        <p>{{ event.startDate }}</p>
      </div>
    </div></router-link>
    </template>


<script>

import { Event } from '../models/Event.js'

export default {
    props: {event: {type: Event, required: true}},
    setup(){
    return { 

    }
    }
};
</script>


<style lang="scss" scoped>

.event-img{
  height: 50vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

</style>
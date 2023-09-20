<template>
    <div class="card event-img">
      <img :src="event.coverImg" alt="">

    </div>
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
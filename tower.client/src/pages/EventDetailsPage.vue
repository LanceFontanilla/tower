
<template>
<div class="container-fluid">
    <section v-if="activeEvent" class="elevation-5 ">
        <div class="col-12 card elevation-4">
        <div class="card event-img ">
        <img class="img-fluid" :src="activeEvent.coverImg" alt="">
        <div>
        <p>{{ activeEvent.name }}</p>
        <p>{{ activeEvent.location }}</p>
        <p>{{ activeEvent.startDate }}</p>
        </div>
        </div>
        </div>
    </section>
    <section v-else>
    <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
    </section>
</div>

</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import { AppState } from '../AppState';

export default {
setup() {
    const route = useRoute()
    onMounted(() => {
        getEventById()
    })
    async function getEventById(){
        try {
            const eventId = route.params.eventId
            await eventsService.getEventById(eventId)
            logger.log('getting event by id' , eventId)
        } catch (error) {
            Pop.error(error)
        }
    }
    return {
        getEventById,
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(() => AppState.account),
        user: computed(() => AppState.user),

    };
},
};
</script>


<style lang="scss" scoped>
</style>
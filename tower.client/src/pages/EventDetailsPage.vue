
<template>
<div class="container-fluid">
    <section v-if="activeEvent" class="p-4">
        <div class=" bg-light-purple ">
            <div class="row p-4">
                <div class="col-md-5 img-card">
                    <img class="img-fluid" :src="activeEvent.coverImg" alt="">
                </div>
                <div class="col-md-7">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between ">
                            <p class="fs-3 fw-bold">{{ activeEvent.name }}</p>
                            <p class="fs-5 fw-bold">{{ activeEvent.startDate }}</p>
                        </div>
                        <div class="col-12 d-flex justify-content-between">
                            <p class="fs-5 fw-bold">{{ activeEvent.location }}</p>
                        </div>
                        <div class="col-12">
                            <p class="">{{ activeEvent.description}}</p>
                        </div>
                        <div class="col-12 d-flex justify-content-between">
                            <p>Total Capacity: <span>{{ activeEvent.capacity }}</span></p>
                            <p>Number of Tickets: <span>{{ activeEvent.ticketCount }}</span></p>
                        </div>
                        <div class="col-12">
                            <span class="mb-4">Event Hosted By:</span><br><img class="profile-pic mt-1" :src="activeEvent.creator.picture" alt="">  <span class="fw-bold">{{ activeEvent.creator.name }}</span> 
                        </div>
                    </div>
                </div>    

            </div>
        </div>
    </section>
    <section v-else>
    <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
    </section>

    <section class="p-4">
        <div class="col-12 mt-4 bg-light-purple text-light">
            <div class="comment-card">
                Attendees
            </div>

        </div>
    </section>
    <section class="p-5">
        <CommentForm/>
    </section>
<section class="text-light">
        <div v-for="c in comments" :key="c.id" class="col-6 col-md-3">
        <CommentCard :comment="c"/>

        </div>

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
import CommentCard from '../components/CommentCard.vue'
export default {
setup() {
    const route = useRoute()
    onMounted(() => {
        getEventById()
        getCommentsByEvent()
        
        
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
    async function getCommentsByEvent(){
        try {
            const eventId = route.params.eventId
            await eventsService.getCommentsByEvent(eventId)
            logger.log('getting comments by eventId', eventId)
        } catch (error) {
            Pop.error(error)
        }
    }
    return {
        getEventById,
        getCommentsByEvent,
        comments: computed(() => AppState.comments),
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(() => AppState.account),
        user: computed(() => AppState.user),

    };
},
components: { CommentCard }
};
</script>


<style lang="scss" scoped>
.img-card{
    height:100%
}

.bg-light-purple{
    background-color: rgba(71, 76, 97, 1) 
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

.profile-pic{
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}



</style>
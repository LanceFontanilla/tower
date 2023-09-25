
<template>
<div class="container-fluid">
    <section v-if="activeEvent" class="p-4">
        <div class=" bg-light-purple text-light ">
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
                        <div v-if="capacity == 0" class="col-12 col-md-6 text-center d-flex justify-content-center align-items-center bg-danger rounded">
                            <h3>SOLD OUT</h3>
                        </div>
                        <div v-else class="col-12 col-md-6">
                            <p>Total Capacity: <span>{{ capacity }}</span></p>
                        </div>    
                        <div class="col-6 d-flex justify-content-end">
                            <p class="ms-2">Number of Ticket Holders: <span>{{ ticketHolder }}</span></p>
                        </div>
                        <div class="col-12 col-md-6 mt-3">
                            <span class="mb-4">Event Hosted By:</span><br><img class="profile-pic my-1" :src="activeEvent.creator.picture" alt="">  <span class="fw-bold">{{ activeEvent.creator.name }}</span> 
                        </div>
                        <div v-if="activeEvent.isCanceled == false " class="col-12 col-md-6 d-flex justify-content-center align-items-center p-0 my-3" >
                            <div v-if="!hasTicket && user.isAuthenticated && capacity >0" class="col-12 col-md-6 bg-dark-purple text-center  d-flex justify-content-center align-items-center selectable p-3 rounded" @click="createTicket" role="button">
                                <h4>Click here to attend!</h4>
                            </div>
                            <div v-else-if="user.isAuthenticated" class="col-12 col-md-6 bg-purple text-center d-flex justify-content-center align-items-center selectable p-3 rounded" @click="deleteTicket" role="button">
                                <h4>Click to un-attend!</h4>
                            </div>
                        </div>
                        <div v-else class="col-12 bg-danger mt-3 d-flex justify-content-center align-items-center">
                            <h3>THIS EVENT HAS BEEN CANCELED!</h3>
                        </div>
                        
                        <div class="text-start">
                            <button v-if="activeEvent.creatorId == account.id & activeEvent.isCanceled == false" @click="cancelEvent" class="btn btn-danger">Cancel Event</button>
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
        
        <div v-if="ticketHolder != 0" class="convo-text mt-3">
            <p>See who is attending!</p> 
        </div>
        <div v-else class="convo-text mt-3">
            <p>Be the first to attend!</p> 
        </div>        
        <div class="col-12 m-0 bg-light-purple convo-box row  ">                
            <div v-for="t in tickets " :key="t.id" class="p-3 col-3">
                <img  :src="t.profile.picture" alt="" class="profile-pic">
                <span class="ms-3"> {{ t.profile.name }}</span>
            </div>
        </div>
    </section>

    <section class="p-5">
        <CommentForm/> 
        <div v-for="c in comments" :key="c.id" >
        <CommentCard :comment="c"/>
        </div>
    </section>

<section class=" p-5">

</section>
</div>

</template>

<script>
import { computed, onMounted, watchEffect, } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import { AppState } from '../AppState';
import CommentCard from '../components/CommentCard.vue'
import { ticketsService } from '../services/TicketsService';

export default {
setup() {

    const route = useRoute()
    watchEffect(() => {
        getEventById()
        getCommentsByEvent()
        getTicketsByEvent()
    });
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
    async function getTicketsByEvent(){
        try {
            const eventId = route.params.eventId
            await eventsService.getTicketsByEvent(eventId)
            logger.log('getting tickets', eventId)
        } catch (error) {
            Pop.error(error)
        }
    }

    async function cancelEvent() {
        try {
            const eventId = route.params.eventId
            logger.log('lets cancel', eventId)
            if (await Pop.confirm('Are you sure you want to cancel this event?')) {
                await eventsService.cancelEvent(eventId)
                logger.log('canceling', eventId)
                Pop.toast('You have canceled this event.', 'success', 'center')
            }
        } catch (error) {
            Pop.error(error)
        }
    }
    

    return {
        cancelEvent,
        getEventById,
        getCommentsByEvent,
        getTicketsByEvent,
        
        comments: computed(() => AppState.comments),
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(() => AppState.account),
        user: computed(() => AppState.user),
        tickets: computed (() => AppState.activeEventTickets),
        hasTicket: computed(() => AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),
        capacity: computed(() => AppState.activeEvent.capacity - AppState.activeEventTickets.length),
        ticketHolder: computed (() => AppState.activeEventTickets.length),
        isCanceled: computed(() => AppState.activeEvent.isCanceled ),
        async createTicket() {
            try {
                let ticketData = { eventId: route.params.eventId }
                await ticketsService.createTicket(ticketData)
            } catch (error) {
                Pop.error(error)
            }
        },

        async deleteTicket(){
            try {
                let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)
                await ticketsService.deleteTicket(ticket.id) 
            } catch (error) {
                Pop.error(error)
            }
        }


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

.profile-pic{
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}



</style>
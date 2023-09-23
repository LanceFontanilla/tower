import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Event} from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
    async getEvents(){
        AppState.events = []
        const res = await api.get('api/events')
        logger.log('getting events', res.data)
        AppState.events = res.data.map(event => new Event(event))
    }
    async getEventById(eventId){
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`) 
        logger.log(res.data, 'getting event by id')
        AppState.activeEvent = new Event(res.data)
    }
    async getCommentsByEvent(eventId) {
        logger.log(eventId, 'this is the event id')
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('got comments by eventId', res.data)
        AppState.comments = res.data.map(comment => new Comment(comment))
    }
    async getTicketsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        
        logger.log('tickets', res.data)
        AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket))
        logger.log('app event tickets', res.data)
    }
    async getTicketsByAccount() {
        const res = await api.get('/account/tickets')
        logger.log('my tickets', res.data)
        AppState.myTickets = res.data.map(ticket => new Ticket(ticket))
        //await this.getMyEvents()
    }
    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('created event', res.data)
        const newEvent = new Event(res.data)
        return newEvent
    }
    async cancelEvent(eventId){
        logger.log('this is the eventId in the service', eventId)

        const res = await api.delete(`api/events/${eventId}`)
        logger.log('this is a cancel', res.data)

        const canceledEvent = new Event(res.data)
        return canceledEvent
    }

    // async getMyEvents() {

    // AppState.myTickets.forEach(ticket => {
    //     let event = AppState.events.find((event) => event.id == ticket.eventId)
    //     if (event != undefined) {
    //     AppState.myEvents.push(event)
            
    //     }
    //     });

    // }
}

export const eventsService = new EventsService()
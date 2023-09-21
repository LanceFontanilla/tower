import { AppState } from "../AppState.js"
import { Event} from "../models/Event.js"
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

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('created event', res.data)
        const newEvent = new Event(res.data)
        return newEvent
    }
}

export const eventsService = new EventsService()
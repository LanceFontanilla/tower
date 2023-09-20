import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class EventsService {
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        if (!event) {
            throw new BadRequest(`No Event At Id: ${eventId}`)
        }
        return event
    }
    async getEvents(query) {
        const event = await dbContext.Events.find(query).sort('-createdAt').populate('creator ticketCount')
        return event
    }

    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event

    }
}

export const eventsService = new EventsService()
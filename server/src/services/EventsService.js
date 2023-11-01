import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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
    async editEvent(eventId, updates, userId) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if (!originalEvent) throw new Error(`Unable to find exhibit at ${eventId}`)
        if (originalEvent.isCanceled == true) throw new Error(`Event has been canceled, you cannot edit a canceled event.`)
        if (originalEvent.creatorId != userId) throw new Forbidden("You do not own this and cannot edit it.")
        originalEvent.name = updates.name != undefined ? updates.name : originalEvent.name
        originalEvent.type = updates.type != undefined ? updates.type : originalEvent.type
        originalEvent.location = updates.location != undefined ? updates.location : originalEvent.location
        originalEvent.capacity = updates.capacity != undefined ? updates.capacity : originalEvent.capacity
        originalEvent.startDate = updates.startDate != undefined ? updates.startDate : originalEvent.startDate
        originalEvent.description = updates.description != undefined ? updates.description : originalEvent.description
        originalEvent.coverImg = updates.coverImg != undefined ? updates.coverImg : originalEvent.coverImg

        await originalEvent.save()
        return originalEvent
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden("This is not your event. You are not allowed to do this.")
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }

}

export const eventsService = new EventsService()
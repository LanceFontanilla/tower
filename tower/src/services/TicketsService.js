import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { eventsService } from "./EventsService.js"
eventsService

class TicketsService {

    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('event')
        await ticket.populate('profile')
        return ticket

    }
    async getTicketsByAccount(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount' } })
        return tickets
    }

    async getTicketsByEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    }

    async deleteTicket(ticketId, userId) {
        const foundTicket = await dbContext.Tickets.findById(ticketId)
        if (foundTicket.accountId != userId) throw new Forbidden("This is not your ticket, you cannot delete it.")
        await foundTicket.remove()
        return `Your ticket has been removed`
    }

}

export const ticketsService = new TicketsService()
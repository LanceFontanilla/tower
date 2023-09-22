import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService{
    async createTicket(ticketData){
        const res = await api.post('api/tickets' , ticketData)
        logger.log('new ticket', res.data)
        AppState.activeEventTickets.push(new Ticket(res.data))
        
    }

    async deleteTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('removed ticket' , res.data)
        let indexToRemove = AppState.activeEventTickets.findIndex(ticket => ticket.id == ticketId)
        AppState.activeEventTickets.splice(indexToRemove, 1)
    }
}

export const ticketsService = new TicketsService() 
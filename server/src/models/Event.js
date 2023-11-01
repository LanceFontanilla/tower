import { Schema } from "mongoose"



export const EventsSchema = new Schema({

    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true, maxLength: 500 },
    description: { type: String, required: true, maxLength: 1500 },
    coverImg: { type: String, required: true, maxLength: 500 },
    location: { type: String, required: true, maxLength: 500 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true, required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

EventsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventsSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})


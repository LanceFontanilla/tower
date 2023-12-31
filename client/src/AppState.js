import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Event[]} */
  events: [],

  /** @type {Event||null} */
  activeEvent: null,

  /**@type {Comment[]} */
  activeEventComment: [],

  /**@type {Comment[]} */
  comments: [],

  /**@type {Ticket[]} */
  myTickets: [],
  
  /**@type {Event[]} */
  myEvents: [],

  /**@type {Ticket[]} */
  activeEventTickets: [],



})

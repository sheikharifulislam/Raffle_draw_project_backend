const Ticket = require("../models/Ticket");

class Datatbase {
    constructor() {
        this.tickets = [];
    }

    /**
     * Create and save new ticket
     * @param {string} userName
     * @param {number} price
     * @returns {Ticket} returns a new ticket object
     */
    create(userName, price) {
        const ticket = new Ticket(userName, price);
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * Create multiple ticket for a single user
     * @param {string} userName
     * @param {number} price
     * @param {number} quantity
     * @returns {Array<Ticket>}
     */
    bulkCreate(userName, price, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(userName, price);
            result.push(ticket);
        }
        return result;
    }

    /**
     * return all available tickets
     */
    find() {
        return this.tickets;
    }

    /**
     * find single ticket by userId
     * @param {string} userId
     * @returns {Ticket}
     */
    findById(ticketId) {
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} item
             */

            (item) => item.id === ticketId
        );
        return ticket;
    }

    /**
     * find all tickets for a given user
     * @param {string} userName
     */
    findByUserName(userName) {
        return this.tickets.filter(
            /**
             * @param {Ticket} ticket
             * @returns {Array<Ticket>}
             */
            (ticket) => ticket.userName === userName
        );
    }

    /**
     * update ticket by id
     * @param {string} ticketId
     * @param {{userName: string, price: string}} ticketBody
     * @returns {Ticket}
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.userName = ticketBody.userName ?? ticketBody.userName;
        ticket.price = ticketBody.price ?? ticketBody.price;
        ticket.updateAt = new Date();
        return ticket;
    }

    /**
     * update ticket by user name
     * @param {string} userName
     * @param {{userName: string, price: string}} ticketBody
     * @returns {Ticket}
     */
    updateByUserName(userName, ticketBody) {
        const ticket = this.findByUserName(userName);
        ticket.userName = ticketBody.userName ?? ticketBody.userName;
        ticket.price = ticketBody.price ?? ticketBody.price;
        ticket.updateAt = new Date();
        return ticket;
    }

    /**
     * delete ticket by ticket id
     * @param {string} ticketId
     */
    delteById(ticketId) {
        const index = this.tickets.findIndex(
            (ticket) => ticket.ticketId === ticketId
        );
        if (index !== -1) {
            this.tickets.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * delete ticket by user name
     * @param {string} userName
     */
    delteByUserName(userName) {
        const index = this.tickets.findIndex(
            (ticket) => ticket.userName === userName
        );
        if (index !== -1) {
            this.tickets.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * find winners
     * @param {number} winnerCount
     * @returns {Array<Ticket>}
     */
    draw(winnerCount) {
        let winnerIndexes = new Array(winnerCount);
        let index = 0;
        while (index < winnerCount) {
            let winnerIndex = Math.floor(Math.random() * this.tickets.length);
            if (!winnerIndexes.includes(winnerIndex)) {
                winnerIndexes[index++] = winnerIndex;
                continue;
            }
        }

        const winners = winnerIndexes.map((index) => this.tickets[index]);
        return winners;
    }
}

const myDatabase = new Datatbase();
module.exports = myDatabase;

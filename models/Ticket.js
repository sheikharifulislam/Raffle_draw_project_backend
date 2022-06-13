const shortId = require("shortid");

class Ticket {
    /**
     * Create ticket constructor class
     * @param {string} username
     * @param {number} price
     */
    constructor(username, price) {
        this.id = shortId.generate();
        this.username = username;
        this.price = price;
        this.createAt = new Date();
        this.updateAt = new Date();
    }
}

module.exports = Ticket;

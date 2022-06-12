const Ticket = require("../models/Ticket");

class Datatbase {
    constructor() {
        this.tickets = [];
    }

    // create new ticket
    create() {}

    // return all tickets
    find() {}

    // find single ticket
    findById() {}

    // update ticket
    updateById() {}

    // delete ticket
    delteById() {}
}

const myDatabase = new Datatbase();
module.exports = myDatabase;

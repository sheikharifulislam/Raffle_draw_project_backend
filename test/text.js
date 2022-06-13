const db = require("../db/db");
db.create("user1", 10);
db.create("user2", 10);
db.create("user3", 10);
db.bulkCreate("user4", 10, 5);
db.create("user5", 10);
const allTickets = db.find();

const winners = db.draw(3);
console.log(winners);

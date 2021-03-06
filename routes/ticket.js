const router = require("express").Router();
const db = require("../db/db");

router
    .route("/t/:ticketId")
    .get((req, res) => {
        const { ticketId } = req.params;
        const ticket = db.findById(ticketId);
        res.status(200).json(ticket);
    })
    .patch((req, res) => {
        const { ticketId } = req.params;
        const { userName, price } = req.body;
        const updatedTicket = db.updateById(ticketId, userName, price);
        res.status(200).json({
            message: "update Successfully",
            updatedTicket,
        });
    })
    .delete((req, res) => {
        const { ticketId } = req.params;
        db.delteById(ticketId);
        res.status(203).send();
    });

router
    .route("/u/:userName")
    .get((req, res) => {
        const { userName } = req.params;
        const ticket = db.findByUserName(userName);
        res.status(200).json(ticket);
    })
    .patch((req, res) => {
        const { userName } = req.params;
        const updatedTicket = db.updateByUserName(userName);
        res.status(200).json({
            message: "update Successfully",
            updatedTicket,
        });
    })
    .delete((req, res) => {
        const { userName } = req.params;
        db.delteByUserName(userName);
        res.status(203).send();
    });

router.post("/sell", (req, res) => {
    const { userName, price } = req.body;
    const ticket = db.create(userName, price);
    res.status(201).json({
        message: "Ticket Create Successfully",
        ticket,
    });
});
router.post("/bulk", (req, res) => {
    const { userName, price, quantity } = req.body;
    const tickets = db.bulkCreate(userName, price, quantity);
    res.status(201).json({
        message: "Bulk Create Successfully",
        tickets,
    });
});
router.get("/draw", (req, res) => {
    const winnerCount = req.query.WC ?? 3;
    const winners = db.draw(winnerCount);
    res.status(200).json(winners);
});
router.get("/", (_req, res) => {
    const tickets = db.find();
    res.status(200).json(tickets);
});

module.exports = router;

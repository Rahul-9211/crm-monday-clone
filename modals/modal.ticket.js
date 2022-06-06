const { json } = require("express");
const mongoose = require("mongoose");

const Tickets = new mongoose.Schema(
    {
        uniqueId: { type: String },
        category: { type: String },
        title: { type: String },
        owner: { type: String },
        avatar: { type: String },
        status: { type: String },
        priority: { type: String },
        progress: { type: String },
        description:
            { type: String },
        timestamp: { type: JSON },
    },
    { collection: "Tickets" }
);

const modalTickets = mongoose.model(
    "Tickets",
    Tickets
);

module.exports = modalTickets;

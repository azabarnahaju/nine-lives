const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = "4000";

app.get("/", (req, res) => {
    res.send("I am working")
})

// GET, POST, PATCH, REMOVE => /api/v1/users users/:id
// GET, POST, PATCH, REMOVE => cats, cats/:id
// GET => breeds breeds/:id
// GET => disease 

// Schema: user, cat

app.listen(PORT, () => {
    console.log("Server is listening on port 4000.")
})
const express = require("express");

const db = require("./data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
    db("accounts")
        .select("name","budget")
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })
     
})

module.exports = router;
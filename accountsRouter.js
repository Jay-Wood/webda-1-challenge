const express = require("express");

const db = require("./data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
    db("accounts")
        // .select("name","budget")
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })
})

router.get("/:id", (req, res) => {
    let id = req.params.id;
    
    db("accounts")
        .where("id", id)    
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })
})

router.post("/", (req, res) => {
    let newPost = req.body;

    db("accounts")
        .insert(newPost)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })
})

router.put("/:id", (req, res) => {
    let { id } = req.params;
    let updates = req.body;

    db("accounts")
        .where({ id })    
        .update(updates)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })

})

router.delete("/:id", (req, res) => {
    let id = req.params.id;

    db("accounts")
        .where("id", id)
        .del()
        .then( count => {
            res.status(200).json({message: `${count} accounts deleted.`})
        })
        .catch(error => {
            res.status(500).json({error: `An error occurred: ${error}`})
        })
})

module.exports = router;
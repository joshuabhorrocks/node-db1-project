const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({data: accounts});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.messsage });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({id: req.params.id})
    .first() // pick the first record from the array
    .then(account => {
      if (account) {
        res.status(200).json({data: account});
      } else {
        res.status(404).json({message: "No accounts by that ID"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: error.messsage});
    });
});

router.post("/", (req, res) => {
  const account = req.body;
  if (isValidAccount(account)) {
    db("accounts")
      .insert(account, "id")
      .then(acc => {
        res.status(201).json({data: acc});
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: error.messsage});
      });
  } else {
    res
      .status(400)
      .json({message: "please provide name and budget for the account"});
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({data: count});
      } else {
        res.status(404).json({message: "record not found by that Id"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: error.messsage});
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({id: req.params.id})
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({data: count});
      } else {
        res.status(404).json({message: "account not found by that id"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: error.messsage});
    });
});

function isValidAccount(account) {
  return Boolean(account.name && account.budget);
}

module.exports = router;
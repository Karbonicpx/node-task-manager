const express = require('express');
const router = express.Router();

const { tasks } = require('../data/tasks');

// Relative url (the / will be combinated with /api/tasks)
router.get('/', (req, res) => {

    // Gives a correct response and show the tasks in json format
    res.status(200).json(tasks);
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { tasks } = require('../data/tasks');

// Relative url (the / will be combinated with /api/tasks)
router.get('/', (req, res) => {

    // Gives a correct response and show the tasks in json format
    res.status(200).json(tasks);
});

router.post('/', (req, res) => {

    // The name will be defined by the user, that's why we use req
    // req ==> User, res ==> Backend response
    const { name } = req.body;

    // Checking if the name is not empty
    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'Task name is required'
        });
    }

    // Generate new id
    const newId = tasks.length > 0
        ? tasks[tasks.length - 1].id + 1
        : 1;

    // Creating new Task
    const newTask = {
        id: newId,
        name: name,
        completed: false
    };

    // Adding new task to array
    tasks.push(newTask);

    // Succesful response
    res.status(201).json(newTask);
})

module.exports = router;

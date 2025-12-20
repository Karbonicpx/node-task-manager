const express = require('express');
const router = express.Router();

const { tasks } = require('../data/tasks');

// Relative url (the / will be combinated with /api/tasks)
router.get('/', (req, res) => {

    // Gives a correct response and show the tasks in json format
    res.status(200).json(tasks);
});

router.post('/', (req, res) => {

    // The name will be used to add the name in the newly created task inside the API
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

// Id param
// Ex: api/tasks/1 --> Delete id 1
router.delete('/:id', (req, res) => {

    // The parameter will have string type, so we are converting it to number
    const taskId = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    // Add error handling if the index is -1 or less than that
    if (index <= -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Removes element in the array with the found index
    tasks.splice(index, 1);

    // Sending succesful response
    res.status(204).send();
})

module.exports = router;

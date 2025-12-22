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

// Updating task
router.put('/:id', (req, res) => {
    const {newName, newCompleted } = req.body;

    const taskId = Number(req.params.id)

    const task = tasks.find(t => t.id === taskId);

    task.name = newName;
    task.completed = newCompleted;

    res.status(200).json(task);
})

// Router for the edit page
// Needs to be before the delete because the router will get the delete first
router.get('/:id', (req, res) => {
    
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    res.status(200).json(task);
});


// Id param
// Ex: api/tasks/1 --> Delete id 1
router.delete('/:id', (req, res) => {

    // The parameter will have string type, so we are converting it to number
    const taskId = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    // Removes element in the array with the found index
    tasks.splice(index, 1);

    // Sending succesful response
    res.status(204).send();
})



module.exports = router;

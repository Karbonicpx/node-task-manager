const tasks = [
    {
       id: 1,
       name: "Walk with the Dog",
       completed: false
    }

]

const moongose = require('mongoose')


// Setting up the data structure
const TaskSchema = new moongose.Schema({
    id: Number, name: String, completed: Boolean
})

// Exporting schema model
module.exports = { tasks }, moongose.model('Task', TaskSchema);
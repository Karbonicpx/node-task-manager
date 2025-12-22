const mongoose = require('mongoose');

// Connecting to the database
const connectionString = "mongodb+srv://nap1903:Nicolas%40@nodetaskmanager.ljk1ncf.mongodb.net/NodeTaskManager?retryWrites=true&w=majority&appName=NodeTaskManager";


const connectDb = (url) => {
    return mongoose.connect(url)  
}


module.exports = { connectDb };

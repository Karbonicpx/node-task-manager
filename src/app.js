const express = require('express');
const app = express();
const mongo = require('./data/connect')

const tasksRouter = require('./routes/tasks');

require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));


app.use('/api/tasks', tasksRouter);

// Starting server with mongoDB
const start = async () => {
    try {
        
        // Fetching database link in the .env
        await mongo.connectDb(process.env.MONGO_URI);
        app.listen(5000, () => {
            console.log(`Server running on port 5000`);
        });

    } catch (error) {
        console.log(error)
    }
}


start()


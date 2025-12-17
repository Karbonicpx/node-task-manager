const express = require('express');
const app = express();

const tasksRouter = require('./routes/tasks');

const start = async () => {

    app.use(express.static('./public'));
    
}


app.use('/api/tasks', tasksRouter);

start();

app.get('/', (req, res) => {
    res.statusCode(404).send("Change to '/home'")
});

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});

const express = require('express');
const app = express();

const tasksRouter = require('./routes/tasks');

app.use(express.json());
app.use(express.static('./public'));


app.use('/api/tasks', tasksRouter);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});

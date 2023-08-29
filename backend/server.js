import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// TASK ENDPOINT
// variable to save task
const taskData = [
    { "id": 1, "title": "testing", "description": "This is a test for the first task. Add 6 more task to see infinite scrolling feature" }
];

app.get('/tasks', (req, res) => {
    const { page } = req.query;
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const newData = taskData.slice(startIndex, startIndex + itemsPerPage);
    res.json(newData);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    taskData.push({ "id": taskData.length + 1, "title": newTask.title, "description": newTask.description });
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = taskData.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Item not found' });
    } else {
        taskData[index] = { ...taskData[index], ...updatedTask };
        res.json(taskData[index]);
    }
});

// Delete
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = taskData.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Item not found' });
    } else {
        const deletedItem = taskData.splice(index, 1)[0];
        res.json(deletedItem);
    }
});
// TASK ENDPOINT

app.listen(port, () => {
    console.log(`server running on port ${port}.`)
})
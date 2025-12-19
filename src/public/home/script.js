const taskButton = document.getElementById('add-task-btn');
const tasksContainer = document.getElementById('tasks-container');

document.addEventListener('DOMContentLoaded', () => {
    getTasks();

})


taskButton.addEventListener('click', () => {
    postTasks();
})



function getTasks() {
    const emptyState = document.getElementById('empty-state');

    fetch("/api/tasks").then(response => response.json()).then(data => {

        if (data.length <= 0) {
            emptyState.style.display = 'block';
            tasksContainer.style.display = 'none';

        } else {
            emptyState.style.display = 'none';
            tasksContainer.style.display = 'block';
        }

        data.map((task) => {
            createTaskComponent(task.name);
        })
    })

}

function postTasks() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();

    if (!taskName) return;

    // Here we are defining that the data that will be used will be with a POST Method
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: taskName
        })
    })
    .then(response => response.json())
    .then(newTask => {
        createTaskComponent(newTask.name);
        taskInput.value = '';
    });
}

// Function that will be used to create new tasks components
function createTaskComponent(taskName) {

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
            <div>
                <span>${taskName}</span>
            </div>
            <div class="actions">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;

    tasksContainer.appendChild(taskItem);

    // Animation
    taskItem.style.animation = 'fadeIn 0.5s ease';

}


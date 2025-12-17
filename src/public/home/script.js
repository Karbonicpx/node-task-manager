const taskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const tasksContainer = document.getElementById('tasks-container');


document.addEventListener('DOMContentLoaded', () => {
    const emptyState = document.getElementById('empty-state');

    emptyState.style.display = 'block';
    tasksContainer.style.display = 'none';

})

// Function that will be added to the add task button to create a new task
function createNewTask(taskText) {

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
            <div>
                <span>${taskText}</span>
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


taskButton.addEventListener('click', () => {
    createNewTask(taskInput.textContent.trim());
})

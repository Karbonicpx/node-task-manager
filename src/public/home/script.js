const taskButton = document.getElementById('add-task-btn'); // Button to create new task
const tasksContainer = document.getElementById('tasks-container'); // Component where all tasks will be stored upon
let taskCount = 0; // Number of tasks

// When loading the page, gets all the tasks and update the count UI
document.addEventListener('DOMContentLoaded', () => {
    getTasks();
})


// Add new task with the button add task
taskButton.addEventListener('click', () => {
    postTasks();
})

function getTasks() {

    // Fetching tasks api and returning all tasks in json format
    fetch("/api/tasks").then(response => response.json()).then(data => {

        // Transforming each task in a DOM component
        data.map((task) => {
            createTaskComponent(task.name, task.id, task.completed);
        })

        
    })

}

// Function to add new tasks to the API
function postTasks() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();

    // If the taskName is empty, does not add the task
    if (!taskName) return;

    // Here we are defining that the data that will be used will be with a POST Method
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // The body will have a name, which is defined by the task name
        body: JSON.stringify({
            name: taskName
        })
    })
        .then(response => response.json())
        .then(newTask => {
            createTaskComponent(newTask.name, newTask.id);
            taskInput.value = '';
        });
}

// Deletes the task in the APi and in the front
function deleteTask(id) {

    // Structure: api/tasks/{id of the task we want to delete}
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
    })
}
// Function that will be used to create new tasks components
function createTaskComponent(taskName, taskId, completed) {

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    // Add 'completed' class if the task is completed
    if (completed) {
        taskItem.classList.add('completed');
    }

    // Using this so we can delete in the front end with the DELETE Request
    taskItem.dataset.id = taskId;

    // Creating task item front-end component
    taskItem.innerHTML = `
            <div>
                <span class="task-text">${taskName}</span>
            </div>
            <div class="actions">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;

    // Each component will have an edit and delete button
    const editBtn = taskItem.querySelector('.edit');
    const deleteBtn = taskItem.querySelector('.delete');

    editBtn.addEventListener('click', () => {

        // Going to the edit page and saving the taskId to fetch the info
        window.location.href = `../edit/index.html?id=${taskId}`
    });

    // Making it async so it deletes in the back-end first then deletes in the front-end
    deleteBtn.addEventListener('click', async () => {

        // Preventing multiple clicks and reducing opacity
        deleteBtn.disabled = true;
        deleteBtn.style.opacity = '0.5';
        deleteBtn.style.cursor = 'not-allowed';

        // Deleting from the back-end first, then the front end
        await deleteTask(taskId);

        // If successful, animate removal from frontend
        taskItem.style.animation = 'fadeOut 0.5s ease forwards';

        // Wait for the animation to complete before removing the element
        setTimeout(() => {

            // Deleting in the front ent
            taskItem.remove();

            // Update task count
            taskCount--;
            updateCount(taskCount);

        }, 500);


    });


    tasksContainer.appendChild(taskItem);

    // Entry animation
    taskItem.style.animation = 'fadeIn 0.5s ease';

    // Updating task count
    taskCount++;
    updateCount(taskCount);

}


// Function that will update the count number in the task count component
function updateCount(countNumber) {
    const taskCountElement = document.getElementById('task-count');
    taskCountElement.textContent = countNumber + " Task" + (countNumber !== 1 ? "s" : "");

    // This "Empty state" is an UI that will only show when all the number of the tasks is 0
    const emptyState = document.getElementById('empty-state');

    // If the number is 0, show the emptyState
    if (countNumber <= 0) {
        // Hide tasks container first
        tasksContainer.style.animation = 'fadeOut 0.3s ease forwards';

        // Wait for fade out animation to complete
        setTimeout(() => {
            tasksContainer.style.display = 'none';

            // Show empty state with animation
            emptyState.style.display = 'block';
            emptyState.style.animation = 'fadeInScale 0.5s ease forwards';
        }, 300); // Match duration with CSS fadeOut animation

        // If not, show the tasks
    } else {
        // Hide empty state first if it's visible
        if (emptyState.style.display === 'block') {
            emptyState.style.animation = 'fadeOut 0.3s ease forwards';

            setTimeout(() => {
                emptyState.style.display = 'none';
 
                // Show tasks container with animation
                tasksContainer.style.display = 'block';
                tasksContainer.style.animation = 'fadeIn 0.5s ease forwards';
            }, 300);
        }
    }
}


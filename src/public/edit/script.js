

const taskIdText = document.getElementById("task-id"); // Text that will show the id
const taskNameText = document.getElementById("task-name"); // Text that will show the name of the task
const checkbox = document.getElementById("completed-checkbox"); // Checkbox of completed status

document.addEventListener("DOMContentLoaded", () => {

    const saveButton = document.getElementById("save-btn"); // Save edition button
    const returnButton = document.getElementById("return-btn"); // Return to home page button
    const checkboxCustom = document.querySelector(".checkbox-custom"); // Custom checkbox

    // Getting the params from this window
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Loads task info
    loadTask(id);

    

    // Save the editions on the task
    saveButton.addEventListener('click', () => {
        saveEditedTask(id);
    })

    // Goes to the home page
    returnButton.addEventListener('click', () => {
        window.location.href = "../home/index.html"
    })

    

    // This "Custom" is only a design one, defined by the CSS, here we are changing the real value of the checkbox
    checkboxCustom.addEventListener('click', () => {
        // Invert checkbox state
        checkbox.checked = !checkbox.checked;
        
    });
})



async function loadTask(taskId) {

    // Fetching the get taskId
    const res = await fetch(`/api/tasks/${taskId}`);

    // When the json is fetched, we set the value of the task retrieved to the html components
    await res.json().then(task => {
        taskIdText.textContent = task.id;
        taskNameText.value = task.name;
        checkbox.checked = task.completed;
    })

    
}


async function saveEditedTask(taskId) {

    // Gets a put request on the api
    await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        // Changes the info on the task with the req.body parameters
        body: JSON.stringify({
            newName: taskNameText.value,
            newCompleted: checkbox.checked
        })
        
    })

    // Showing popUp
    showPopup();

    
}

// Function to show popup when saving the edits on the task
function showPopup(type = 'success') {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.popup-notification');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup element
    const popup = document.createElement('div');
    popup.className = `popup-notification popup-${type}`;
    
    // Set icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    popup.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>Success!</span>
        <button class="popup-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // Auto-hide after 3 seconds (for success messages)
    if (type === 'success') {
        setTimeout(() => {
            hidePopup(popup);
        }, 3000);
    }
    
    // Close button functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        hidePopup(popup);
    });
    
    // Also hide on click anywhere on popup
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup(popup);
        }
    });
}

// Function to hide popup
function hidePopup(popup) {
    popup.classList.remove('show');
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 300);
}
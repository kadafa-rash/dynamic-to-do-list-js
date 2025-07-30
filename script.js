// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');      // Add Task button
    const taskInput = document.getElementById('task-input');        // Input field
    const taskList = document.getElementById('task-list');          // UL for tasks

    // Function to add a new task
    function addTask() {
        // Get the task input value and trim whitespace
        const taskText = taskInput.value.trim();

        // Check if task input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Set onclick event to remove this task when the button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Attach event listener to addButton
    addButton.addEventListener('click', addTask);

    // Allow adding task by pressing "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

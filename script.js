document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Function to load tasks from localStorage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't re-save to localStorage
    }

    // Function to save tasks array to localStorage
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get tasks array from localStorage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to add a task to the DOM (and optionally to localStorage)
    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();

        if (trimmedText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = trimmedText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove task on button click (DOM + localStorage)
        removeButton.onclick = function () {
            taskList.removeChild(li);

            // Update storage
            const tasks = getStoredTasks().filter(task => task !== trimmedText);
            saveTasksToStorage(tasks);
        };

        // Append remove button and list item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to localStorage if needed
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(trimmedText);
            saveTasksToStorage(tasks);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Event listener for Enter key in task input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});

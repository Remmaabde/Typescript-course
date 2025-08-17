const taskForm = document.querySelector<HTMLFormElement>('.form')!;
const formInput = document.querySelector<HTMLInputElement>('.form-input')!;
const taskListElement = document.querySelector<HTMLUListElement>('.list')!;

// Task type
type Task = {
description: string;
isCompleted: boolean;
};

// Load tasks from localStorage
function loadTasks(): Task[] {
const storedTasks = localStorage.getItem('tasks');
return storedTasks ? JSON.parse(storedTasks) : [];
}

// Save tasks to localStorage
function updateStorage(): void {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Array to hold tasks
let tasks: Task[] = loadTasks();

// Render a single task
function renderTask(task: Task, index: number): void {
const taskElement = document.createElement('li');
taskElement.textContent = task.description;

  // Checkbox for completion
const taskCheckbox = document.createElement('input');
taskCheckbox.type = 'checkbox';
taskCheckbox.checked = task.isCompleted;
taskCheckbox.addEventListener('change', () => {
    tasks[index].isCompleted = taskCheckbox.checked;
    updateStorage();
});

  // Delete button
const deleteBtn = document.createElement('button');
deleteBtn.textContent = '❌';
deleteBtn.addEventListener('click', () => {
    tasks.splice(index, 1);
    updateStorage();
    renderTasks();
});

taskElement.appendChild(taskCheckbox);
taskElement.appendChild(deleteBtn);
taskListElement.appendChild(taskElement);
}

// Render all tasks
function renderTasks(): void {
taskListElement.innerHTML = '';
tasks.forEach(renderTask);
}

// Add a task
function addTask(task: Task): void {
tasks.push(task);
updateStorage();
renderTasks();
}

// Handle form submission
taskForm.addEventListener('submit', (event) => {
event.preventDefault();
const taskDescription = formInput.value.trim();

if (taskDescription) {
    const task: Task = { description: taskDescription, isCompleted: false };
    addTask(task);
    formInput.value = '';
} else {
    alert('Please enter a task description');
}
});

// Initial render
renderTasks();

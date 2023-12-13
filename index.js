// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// Инициализируем список задач из Local Storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = savedTasks;

// Функция для обновления отображения списка задач
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <label for="task${index}">${task.text}</label>
        `;
        taskList.appendChild(listItem);
    });

    // Обновляем состояние кнопки "Очистить список"
    clearButton.disabled = tasks.length === 0;
}

// Функция для добавления задачи в список
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Функция для изменения состояния задачи (выполнена/не выполнена)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Функция для очистки списка задач
function clearList() {
    tasks = [];
    localStorage.removeItem('tasks');
    renderTasks();
}

// Инициализируем отображение при загрузке страницы
renderTasks();

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');

    // Initialize flatpickr
    flatpickr(taskDate, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        altInput: true,
        altFormat: "F j, Y h:i K"
    });

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDateValue = taskDate.value;

        if (taskText !== '' && taskDateValue !== '') {
            const task = {
                text: taskText,
                date: taskDateValue
            };

            // Adicionar tarefa à lista
            const li = createTaskElement(task);
            taskList.appendChild(li);

            // Save task to localStorage
            saveTask(task);

            // Exibir mensagem de confirmação
            message.textContent = 'Sua tarefa foi salva.';
            setTimeout(() => {
                message.textContent = '';
            }, 3000);

            taskInput.value = '';
            taskDate.value = '';
        } else {
            // Exibir mensagem de erro se o campo estiver vazio
            message.textContent = 'Por favor, preencha todos os campos.';
            setTimeout(() => {
                message.textContent = '';
            }, 3000);
        }
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = `${task.text} - ${task.date}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            // Remove task from localStorage
            deleteTask(task);
        });
        li.appendChild(deleteBtn);
        return li;
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }

    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.text !== task.text || t.date !== task.date);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

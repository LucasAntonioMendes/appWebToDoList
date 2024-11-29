async function addTask() {
    let taskInput = document.getElementById('taskInput').value;
    if (taskInput) {
        await eel.add_Task(taskInput);
        document.getElementById('taskInput').value = '';
        loadTasks()
    }
}

async function loadTasks() {
    let task = await eel.load_task()();
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    taskList.forEach(task => {
        let listItem = document.createElement('li')
        listItem.innerHTML = `
        <span style= "text-decoration: ${task.completed ? 'line-through' : 'none'};">
        ${task.task}
        </span>
        <button onclick = "toggleCompletion('${task.task}')">Concluir</button>
        <button onclick = "editCompletion('${task.task}')">Editar</button>
        <button onclick = "deleteCompletion('${task.task}')">Excluir</button>
    `;

        taskList.appendChild(listItem);
    });
}

async function toggleCompletion(task) {
    await eel.toggle_task_completion(task)();
    loadTasks();
}

async function editTask(task) {
    let newTask = prompt("Editar tarefa: ", task);
    if (newTask && newTask !== task) {
        await removeEventListener.edit_task(task, newTask)();
        loadTasks();
    }
}

async function deleteTask(task) {
    await eel.delete_task(task)();
    loadTasks();
}

async function toggleTeme() {
    document.body.classList.toggle('dark-theme')
    const newTheme = document.classList.contains('dark-themes') ? 'dark' : 'light';
    await eel.set_theme(newTheme)();
}

async function loadTheme() {
    const theme = await eel.get_theme()();
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

document.addEventListener("DOMContentloaded", () => {
    loadTasks();
    loadTheme();
})
const modal = document.getElementById('taskmodal');
const addButton = document.getElementById('addtaskbutton');
const closeModalButton = document.getElementById('closemodal');
const taskForm = document.getElementById('taskform');

let currentTask = null;

function updateCounters() {
    const todoCount = document.getElementById('todolist').children.length;
    const doingCount = document.getElementById('doinglist').children.length;
    const doneCount = document.getElementById('donelist').children.length;

    document.getElementById('todocounter').textContent = todoCount;
    document.getElementById('doingcounter').textContent = doingCount;
    document.getElementById('donecounter').textContent = doneCount;
}

function addTaskToList(title, description, status, Priorité, date) {
    const taskItem = document.createElement('div');
    let borderColor;

    if (Priorité === 'P1') {
        borderColor = 'border-lime-500'; 
    } else if (Priorité === 'P2') {
        borderColor = 'border-orange-400'; 
    } else if (Priorité === 'P3') {
        borderColor = 'border-red-500'; 
    }

    taskItem.className = `w-52 h-18 ${borderColor} border-l-8 rounded-r-lg bg-white my-5 justify-self-center flex justify-between items-center p-2`;
    taskItem.innerHTML = `
        <div>
            <strong>${title}</strong>
            <textarea class="resize-none" readonly>${description}</textarea>
            <div class="text-sm mb-2">Date: ${date}</div>
            <div class="flex gap-4">
                <button class="deleteButton bg-red-500 text-white px-2 rounded">Supprimer</button>
                <button class="editButton bg-cyan-400 text-white px-2 rounded">Modifier</button>
            </div>
        </div>
    `;

    if (status === 'to-do') {
        document.getElementById('todolist').appendChild(taskItem);
    } else if (status === 'doing') {
        document.getElementById('doinglist').appendChild(taskItem);
    } else if (status === 'done') {
        document.getElementById('donelist').appendChild(taskItem);
    }

    taskItem.querySelector('.deleteButton').addEventListener('click', () => {
        taskItem.remove();
        updateCounters();
    });

    taskItem.querySelector('.editButton').addEventListener('click', () => {
        document.getElementById('title').value = title;
        document.getElementById('description').value = description;
        document.getElementById('status').value = status;
        document.getElementById('Priorité').value = Priorité;
        document.getElementById('date').value = date;


        currentTask = taskItem; 
        modal.classList.remove('hidden');
    });

    updateCounters();
}

addButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('Priorité').value;
    const date = document.getElementById('date').value;

    


    if (currentTask) {
        currentTask.querySelector('strong').textContent = title;
        currentTask.querySelector('textarea').value = description; 

        const oldStatus = currentTask.getAttribute('data-status'); 
        currentTask.remove();
        addTaskToList(title, description, status, priority, date); 
    } else {
        addTaskToList(title, description, status, priority, date);
    }

    modal.classList.add('hidden');
    taskForm.reset();
});
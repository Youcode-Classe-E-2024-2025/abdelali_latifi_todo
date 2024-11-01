const modal = document.getElementById('taskmodal');
        const addButton = document.getElementById('addtaskbutton');
        const closeModalButton = document.getElementById('closemodal');
        const taskForm = document.getElementById('taskform');
        
        function updateCounters() {
            const todoCount = document.getElementById('todolist').children.length;
            const doingCount = document.getElementById('doinglist').children.length;
            const doneCount = document.getElementById('donelist').children.length;

            document.getElementById('todocounter').textContent = todoCount;
            document.getElementById('doingcounter').textContent = doingCount;
            document.getElementById('donecounter').textContent = doneCount;
        }
        
        function addTaskToList(title, description, status, Priorité) {
            const taskItem = document.createElement('div');
            let borderColor;

            switch (Priorité) {
                case 'P1':
                    borderColor = 'border-lime-500'; 
                    break;
                case 'P2':
                    borderColor = 'border-orange-400'; 
                    break;
                case 'P3':
                    borderColor = 'border-red-500'; 
                    break;
                default:
                    borderColor = 'border-black'; 
            }

            taskItem.className = `w-52 h-18 ${borderColor} border-l-8 rounded-r-lg bg-white my-5 justify-self-center flex justify-between items-center p-2`;
            taskItem.innerHTML = `
                <div>
                    <strong>${title}</strong>
                    <textarea class="task-description" readonly>${description}</textarea>
                </div>
            `;

            if (status === 'to-do') {
                document.getElementById('todolist').appendChild(taskItem);
            } else if (status === 'doing') {
                document.getElementById('doinglist').appendChild(taskItem);
            } else if (status === 'done') {
                document.getElementById('donelist').appendChild(taskItem);
            }
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

            addTaskToList(title, description, status, priority);

            modal.classList.add('hidden');
            taskForm.reset();
        });
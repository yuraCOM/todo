const addTaskRtn = document.querySelector('#add-task-btn')
const deskTaskInput = document.querySelector('#description-task')
const todosWrapper = document.querySelector('.todos-wrapper')

//массив заданий
let tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

// массив всех делл
let todoItemsList = [];

//генерируем задание
function Task(description) {
    this.description = description;
    this.completed = false;
};

//стрелочная ф - записваем в локал
const updateLocalStore = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//отмечаем чекед
const completeTask = index =>{
    tasks[index].completed = !tasks[index].completed
    if (tasks[index].completed){
        todoItemsList[index].classList.add('checked')
    }
    else {
        todoItemsList[index].classList.remove('checked')
    }
    updateLocalStore()
    fillHtmlList()
};

// функция создает див для вставки в документ дела
const createTemplate = (task, index)=>{
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-completed" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="delTask(${index})" class="btn-del">DELETE</button>
            </div>
         </div>
    `
}

//филтер массива на актив и сделанные и потом распределение их на листе
const filterTasks = ()=>{
    let activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    let completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks]
}

//функц добовления на экран задач из локал стор  и пробежка по массиву
const fillHtmlList = ()=>{
    todosWrapper.innerHTML = '';
    if (tasks.length > 0){
        filterTasks()
        tasks.forEach((item, index)=>{
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemsList = document.querySelectorAll('.todo-item')
    }
};
fillHtmlList()

//общая функция обрабатывает нажатие кнопки + дело в массив
addTaskRtn.addEventListener('click', ()=>{
    tasks.push(new Task(deskTaskInput.value));
    updateLocalStore()
    fillHtmlList()
    deskTaskInput.value = ''

});

//функция удаления дела
const delTask = index =>{
    todoItemsList[index].classList.add('delition');
    setTimeout(()=>{
        tasks.splice(index,1);
        updateLocalStore();
        fillHtmlList();
    },500)

}

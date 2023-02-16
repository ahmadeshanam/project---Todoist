'use strict'

let welComeTxt = document.querySelector('#welcme');
let tasksList = document.querySelector('.taskList');
let addTaskBtn = document.querySelector('.btnAddTask');
let messageBot = document.querySelector('.congrats');


let user = {
    userName: "user",
    tasks: [],
    tasksDone: []
}

const getUserName = function () {
    let userNameTxt = prompt("Please enter your name", "username");
    userNameTxt == null ? userNameTxt = "USER" : user.userName = userNameTxt;
    console.log(user.userName);
    welComeTxt.innerHTML = `welcome ${user.userName}, wish you a good day!`;
}

const updateUI = function (userLogged) {
    tasksList.innerHTML = "";

    for (let i = userLogged.tasks.length - 1; i > -1; i--) {
        let html = `
        <div class="task">
                <div class="taskContainer">
                    <p class="task_name">${userLogged.tasks[i]}</p>
                </div>
                <input type="checkbox" class="task_checkBox" id="c${i}" onchange="checkboxFun(user, this)">
                <button class="task_remove" id="r${i}" onclick="removeTaskFun(user, this)"><span class="material-symbols-outlined">
                        delete
                    </span></button>
            </div>
        `;
        tasksList.insertAdjacentHTML("afterbegin", html);
    }
    const tasksDoneStyle = document.querySelectorAll('.task_name');
    const checkboxes = document.querySelectorAll('.task_checkBox');
    for (let j = 0; j < userLogged.tasksDone.length; j++) {
        if (userLogged.tasksDone[j] == 1) {
            tasksDoneStyle[j].classList.add('lineThrough');
            checkboxes[j].checked = true;
        }
    }
    messageBot.textContent = bottomMessage(user);
}

const addTaskFun = function (userLogged) {
    let newTask = prompt("Task name:", "");
    userLogged.tasks.push(newTask);
    userLogged.tasksDone.push(0);
    updateUI(userLogged);
}

const checkboxFun = function (userLogged, checkboxBtnPressed) {
    console.log("I was called");
    let newTasksDoneArr = [];
    let checkboxBtn = document.querySelectorAll('.task_checkBox');
    for (let i = 0; i < checkboxBtn.length; i++) {
        if (checkboxBtn[i].id != checkboxBtnPressed.id) {
            newTasksDoneArr.push(userLogged.tasksDone[i]);
        }
        else {
            newTasksDoneArr.push(!userLogged.tasksDone[i]);
        }
    }
    console.log(newTasksDoneArr);
    userLogged.tasksDone = newTasksDoneArr;
    updateUI(userLogged);

}

const removeTaskFun = function (userLogged, removeTaskBtnPressed) {
    let newTasksArr = [];
    let newTasksDoneArr = [];
    let removeTaskBtn = document.querySelectorAll('.task_remove');
    for (let i = 0; i < removeTaskBtn.length; i++) {
        if (removeTaskBtn[i].id != removeTaskBtnPressed.id) {
            newTasksArr.push(userLogged.tasks[i]);
            newTasksDoneArr.push(userLogged.tasksDone[i]);

        }
    }
    userLogged.tasks = newTasksArr;
    userLogged.tasksDone = newTasksDoneArr;

    updateUI(userLogged);
}

const bottomMessage = function (userLogged) {
    let sum = 0;
    let message;
    userLogged.tasksDone.forEach(element => {
        sum += element;
    });
    if (sum == 0) {
        message = "Don't give up, wake up and start 💪";
    }
    else if (sum < userLogged.tasks.length - 1) {
        message = `Congrats! You've done ${sum} tasks so far 🎉`;
    }
    else if (sum == userLogged.tasks.length - 1) {
        message = "Almost there... 1 more task to do 🫡";
    }
    else if (sum == userLogged.tasks.length) {
        message = "You are the greatest!!! Don't forget to plan tommorrow 📃";
    }
    return message;
}

getUserName();
updateUI(user);

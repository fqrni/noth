let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let Tasksafe = [];
if (localStorage.getItem("tasks")) {
    Tasksafe = JSON.parse(localStorage.getItem("tasks"));
}
getdata();


submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
    
}


tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        deletetask(e.target.parentElement.getAttribute("data-id"));

        e.target.parentElement.remove();
        //removing
    }
    if (e.target.classList.contains("task")) {
        //ttdone
        taskstatus(e.target.getAttribute("data-id"));
        //done
        e.target.classList.toggle("done");
    }
});
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,

    };
    Tasksafe.push(task);
    addfrom(Tasksafe);

    //local

    addto(Tasksafe);
}
function addfrom(Tasksafe) {
    tasksDiv.innerHTML = "";
    Tasksafe.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";

        if (task.completed) {
            div.className = "task done";

        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        console.log(div);
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        div.appendChild(span);

        tasksDiv.appendChild(div);


    });
}
function addto(Tasksafe) {
    window.localStorage.setItem("tasks", JSON.stringify(Tasksafe));
}
function getdata() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addfrom(tasks);
    }
}


function deletetask(taskid) {
    Tasksafe = Tasksafe.filter((task) => task.id != taskid);
    addto(Tasksafe);
}



function taskstatus(taskid) {
    for (let i = 0; i < Tasksafe.length; i++) {
        if (Tasksafe[i].id == taskid) {
            Tasksafe[i].completed == false ? (Tasksafe[i].completed = true) : (Tasksafe[i].completed = false);
        }
    }
    addto(Tasksafe);

}



input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("add").click();
    }
  });


/* tasksDiv.addEventListener("click", (e) =>{
    if (e.target.classlist.contains("del")){
 */
        
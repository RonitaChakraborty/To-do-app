document.addEventListener("DOMContentLoaded", ()=>{ 
    const store= JSON.parse(localStorage.getItem('tasks'))

    if(store) //if there are tasks
    {store.forEach((task)=>tasks.push(task))} //push it in tasks array
    updateTaskList();
    statistics();
})

let tasks=[]; //array to store tasks and their state of completion

document.getElementById("newTask").addEventListener('click',function(e){
    e.preventDefault(); //after submitting the text it will prevent reloading of the page
    addTask();
});

const addTask = () => {
    const text= document.getElementById('taskInput').value.trim(); //triming left and right spaces of the string

    if(text)
        tasks.push({text:text, completed:false});

    updateTaskList();
    statistics();
    save();
};

const updateTaskList=() => {
    const taskList=document.getElementById('task-list'); 
    taskList.innerHTML="";//in case any prev list is still stored
    tasks.forEach((task,index) =>{   
        const listItem= document.createElement("li"); 
        listItem.innerHTML=`
        <div class="taskItem"> 
          <div class="task ${task.completed?"completed":""}"> 
            <input type="checkbox" class="checkbox" ${task.completed?"checked":""}> 
            <p>${task.text}</p>
          </div>
          <div class="icons">
           <i class="fa fa-edit"  onclick="editTask(${index})"></i>
            <i class="fa fa-trash-o" onclick="deleteTask(${index})"></i>
          </div>
        </div>`;

        listItem.addEventListener('change', ()=>checkTaskComplete(index)); //when the checkbox will be checked
        taskList.append(listItem); //append to the ul
         });
};

const checkTaskComplete= (index)=>{
    tasks[index].completed = !tasks[index].completed; //change the value of completed
    updateTaskList();
    statistics();
    save();
}

const deleteTask=(index)=>{
    tasks.splice(index,1); 
    updateTaskList();
    statistics();
    save();
}

const editTask=(index)=>{
    document.getElementById('taskInput').value=tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    statistics();
    save();
}

const statistics=()=>{
    const completeTasks=tasks.filter((task)=>task.completed).length;
    const totalTask=tasks.length;
    const progress= (completeTasks/totalTask)*100;
    document.getElementById('progress').style.width=`${progress}%`;
    document.getElementById('numbers').innerHTML= `${completeTasks}/${totalTask}`; 

    if(tasks.length && completeTasks==totalTask)
        confetti();
    if(tasks.length==0)
        document.getElementById('progress').style.width= `0%`;
}
    
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});

//to store the data in local storage
const save=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

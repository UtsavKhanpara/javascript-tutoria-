let alltask = localStorage.getItem('alltask') ? JSON.parse(localStorage.getItem('alltask')) : []

const viewTask = () => {
    let tasks = localStorage.getItem('alltask') ? JSON.parse(localStorage.getItem('alltask')) : []
    let tbl = "";
    tasks.map((val, index) => {
        tbl += `
                    <tr>
                        <td>${val.taskid}</td>
                        <td>${val.task}</td>

                    </tr>
                `
    })
    document.getElementById('alltask').innerHTML = tbl;
}
viewTask();

const addTask = () => {

    let task = document.getElementById('task').value;
    let obj = {
        taskid: Math.floor(Math.random() * 10000000),
        task: task
    }

    let tasks = localStorage.getItem('alltask') ? JSON.parse(localStorage.getItem('alltask')) : []

    let dup = tasks.find(val => val.task == task);

    if (dup) {
        alert("Task is already exists");
        document.getElementById('task').value = ""
        return false;
    }

    let newdata = [
        ...tasks, {
            taskid: obj.taskid,
            task: obj.task
        }
    ];
    localStorage.setItem('alltask', JSON.stringify(newdata));
    alert("record add")
    document.getElementById('task').value = ""
    viewTask();


}
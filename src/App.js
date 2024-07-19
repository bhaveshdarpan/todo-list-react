import { useEffect, useState, useContext } from "react";
import "./App.css";
import Dashboard from "./dashboard";
import { taskContext } from "./AppRoot";

function App() {
  const { allTaskList, setAllTaskList } = useContext(taskContext);
  const [taskList, settaskList] = useState("");
  function getValue() {
    let inputField = document.getElementById("tasks-to-add");
    let value = inputField.value;
    let obj = { title: value, completed: false };
    if (value) {
      setAllTaskList((prev) => {
        return [obj, ...prev];
      });
    } else {
      alert("Please enter a task");
    }
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: value,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    document.getElementById("tasks-to-add").value = "";
  }

  function resetList() {
    setAllTaskList([]);
  }
  function displayAPIList() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setAllTaskList(json));
  }
  useEffect(() => {
    displayAPIList();
  }, []);

  console.log(taskList);
  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <p>Get your to-do list here...</p>
      <input
        type="text"
        placeholder="Write your pending task here..."
        id="tasks-to-add"
      />
      <div className="buttons">
        <button className="add-button" id="add-task" onClick={getValue}>
          Add to the list
        </button>
        <button className="reset-button" id="reset-list" onClick={resetList}>
          Reset List
        </button>
        <button className="api-button" id="api-list" onClick={displayAPIList}>
          Get To-Do list from API
        </button>
      </div>
      {/* <div className="task-counters">
        <p className="task-state">Total Tasks: {taskList.length}</p>
        <p className="task-state">Completed Tasks: {completedTaskList}</p>
        <p className="task-state">Pending Tasks: {pendingTaskList}</p>
      </div> */}
      <Dashboard taskList={allTaskList} />

      <div className="task-list">
        {allTaskList.map((task, index, arr) => (
          <div key={index} className="task">
            <input
              id="check-status"
              type="checkbox"
              onChange={() => {
                task.completed = !task.completed;
                setAllTaskList([...allTaskList]); // understand the code below
              }}
            />
            {task?.completed}
            <h4>{task?.title}</h4>
            <button
              className="delete-button"
              onClick={() => {
                setAllTaskList((prev) => {
                  return prev.filter((item, i) => i !== index);
                });
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

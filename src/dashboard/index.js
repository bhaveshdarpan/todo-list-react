function Dashboard({ taskList }) {

  console.log(taskList);
  return (
    <div className="task-counters">
      <div>
        <p className="task-state">Total Tasks: {taskList.length}</p>
      </div>
      <div>
        <p className="task-state">
          Completed Tasks: {taskList?.filter((task) => task.completed).length}
        </p>
      </div>
      <div>
        <p className="task-state">
          Pending Tasks: {taskList?.filter((task) => !task.completed).length}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

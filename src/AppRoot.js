import { createContext, useState } from "react";
import App from "./App";
export const taskContext = createContext();

function AppRoot() {
  const [taskList, settaskList] = useState([]);
  console.log(taskList);
  return (
    <taskContext.Provider
      value={{
        allTaskList: taskList,
        setAllTaskList: settaskList,
      }}
    >
      <App />
    </taskContext.Provider>
  );
}

export default AppRoot;

import { createContext, useEffect, useState } from "react";
import { getTaskByIdRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest, createTaskRequest } from "../api/tasks";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const response = await getTasksRequest()
        setTasks(response.data.tasks)
    }

    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task)
            console.log(response)
        } catch (e){
            console.log(e)
        }

    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}
import { createContext, useEffect, useState } from "react";
import { getTaskByIdRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest, createTaskRequest } from "../api/tasks";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const response = await getTasksRequest()
            setTasks(response.data.tasks)
        } catch (e) {
            console.log(e)
        }
    }

    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id)
            console.log(response)
            await getTasks()
        } catch (e) {
            console.log(e)
        }
    }

    const getTask = async (id) => {
        try {
            const response = await getTaskByIdRequest(id)
            return response.data
        } catch (error) {
            console.log(e)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const response = await updateTaskRequest(id, task)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            getTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}
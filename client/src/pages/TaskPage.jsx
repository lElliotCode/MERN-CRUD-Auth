import { useEffect } from "react"
import { Header } from "../components/Header"
import { useTask } from "../context/useTask"
import { TaskCard } from "../components/TaskCard"

export const TaskPage = () => {

    const { getTasks, tasks } = useTask()

    useEffect(() => {
        getTasks()
    }, [])


    return (
        <>
            <section className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] m-auto gap-x-4 gap-y-2 p-4">
                {tasks.length > 0
                    ? tasks.map(task => {
                        return (
                            <TaskCard task={task} key={task._id} />
                        )
                    })
                    : <div>No hay tareas para mostrar</div>
                }
            </section>
        </>
    )
}
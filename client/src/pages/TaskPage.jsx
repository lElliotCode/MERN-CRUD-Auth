import { useEffect } from "react"
import { Header } from "../components/Header"
import { useTask } from "../context/useTask"

export const TaskPage = () => {

    const { getTasks, tasks } = useTask()

    useEffect(() => {
        getTasks()
    }, [])


    return (
        <>
            <main className="flex flex-col items-center">
                <h1>Task Page</h1>
                <section className="flex flex-col w-full p-8 justify-center items-center gap-4">
                    {tasks.length > 0
                        ? tasks.map(task => {
                            return (
                                <div key={task._id} className="border border-black w-[50%] py-4 px-8 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl font-bold text-white py-2">{task.title}</h2>
                                        <p className="text-sm font-extralight text-zinc-400 py-2">{task.description}</p>
                                    </div>
                                    <aside className="flex flex-col gap-2 items-center">
                                        <div>
                                            <input type="checkbox" name="checkTask" id="checkTask" />
                                            <label htmlFor="checkTask">Marcar tarea hecha</label>
                                        </div>
                                        <button className="px-4 py-2 bg-zinc-800">Eliminar Tarea</button>
                                    </aside>
                                </div>
                            )
                        })
                        : <div>No hay tareas para mostrar</div>
                    }
                </section>
            </main>
        </>
    )
}
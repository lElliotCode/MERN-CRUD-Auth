import { Link } from "react-router-dom"
import { useTask } from "../context/useTask"

export function TaskCard({ task }) {

    const { deleteTask } = useTask()


    return (
        <div className="bg-zinc-900 py-6 px-4 flex justify-between items-center relative rounded-lg">
            <header className="flex flex-col">
                <h2 className="text-2xl font-bold text-white py-2">{task.title}</h2>
                <p className="text-sm font-extralight text-zinc-400 py-2">{task.description}</p>
            </header>
            <aside className="flex flex-col gap-2 items-center">
                <div>
                    <input type="checkbox" name="checkTask" id="checkTask" />
                    <label htmlFor="checkTask">Marcar tarea hecha</label>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => deleteTask(task._id)} className="p-2 bg-zinc-800">Eliminar Tarea</button>
                    <Link to={`/tasks/${task._id}`} className="p-2 bg-zinc-800">Editar Tarea</Link>
                </div>
            </aside>
            <small className="absolute bottom-2 left-2 text-cyan-600"><span className="underline text-zinc-700">Fecha de creación:</span> {new Date(task.date).toLocaleDateString()}</small>
        </div>
    )
}
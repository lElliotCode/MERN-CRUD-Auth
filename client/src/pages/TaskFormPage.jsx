import { useForm } from "react-hook-form"
import { Header } from "../components/Header"
import { useTask } from "../context/useTask"

export const TaskFormPage = () => {

    const {register, handleSubmit} = useForm()
    const { createTask }  = useTask()

    const onSubmit = handleSubmit(data => {
        console.log(data)
        createTask(data)
    })

    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <h2 className="text-2xl p-4">Agregar Tarea</h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center justify-center border border-black px-8 py-4 rounded-lg max-w-lg w-[50%]">
                    <input type="text" placeholder="Title" autoFocus {...register('title')} className="bg-gray-900 outline-none border-none p-2 w-full"/>
                    <textarea name="description" rows='3' placeholder="Description" {...register('description')} className="bg-gray-900 outline-none border-none p-2 resize-none w-full"></textarea>
                    <button className='my-2 py-2 bg-zinc-900 hover:bg-zinc-950 rounded-md w-full'>Agregar</button>
                </form>
            </main>
        </>
    )
}
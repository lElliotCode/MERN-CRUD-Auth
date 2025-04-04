import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'


export function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, user, isAuthenticated, errors: registerErrors } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <>
            <main className='w-full py-4'>
                <div className='bg-zinc-800 p-10 m-auto rounded-md max-w-lg'>
                    {
                        registerErrors.map((err, i) => {
                            return (
                                <div className='bg-red-500 text-white p-2 my-0.5' key={i}>
                                    {err}
                                </div>
                            )
                        })
                    }
                    <form onSubmit={onSubmit} className=' flex flex-col w-full'>

                        <input
                            type="text" placeholder='Username'
                            {...register("username", { required: true })}
                            className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ' />
                        {errors.username && (
                            <p className='text-red-700'>Username is required</p>
                        )}
                        <input
                            type="email" placeholder='Email'
                            {...register("email", { required: true })}
                            className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                        {errors.email && (
                            <p className='text-red-700'>Email is required</p>
                        )}
                        <input
                            type="password" placeholder='Password'
                            {...register("password", { required: true })}
                            className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                        {errors.password && (
                            <p className='text-red-700'>Password is required</p>
                        )}
                        <button
                            className='my-2 py-2 bg-zinc-900 hover:bg-zinc-950 rounded-md'>Registrar</button>
                    </form>
                </div>

            </main>
        </>
    )
}
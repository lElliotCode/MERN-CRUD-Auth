import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'


export function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, isAuthenticated, errors: signinErrors } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signin(values)
    })

    return (
        <>
            <main className='w-full py-4'>
                <div className='bg-zinc-800 p-10 m-auto rounded-md max-w-lg'>
                    <h1 className='text-3xl'>Login</h1>
                    {
                        signinErrors.map((err, i) => {
                            return (
                                <div className='bg-red-500 text-white p-2 my-3 text-center' key={i}>
                                    {err}
                                </div>
                            )
                        })
                    }

                    <form onSubmit={onSubmit} className=' flex flex-col w-full'>

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
                        <button type='submit' className='my-2 py-2 bg-zinc-900 hover:bg-zinc-950 rounded-md'>Ingresar</button>
                    </form>
                    <p>No tienes una cuenta? <Link to='/register' className='text-sky-500 hover:underline' >Regístrate</Link></p>
                </div>

            </main>
        </>
    )
}
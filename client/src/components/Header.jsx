import { Link } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export function Header() {

    const { isAuthenticated, logout, user } = useAuth()

    isAuthenticated ? console.log(user) : null

    return (
        <header className="flex justify-between items-center bg-zinc-800 mx-4 my-2 rounded-lg">
            <Link to='/' className="p-4">
                <h1 className=" text-3xl hover:text-sky-500">Task Manager</h1>
            </Link>
            <nav>
                <ul className="flex gap-4 p-4">

                    {!isAuthenticated
                        ? (
                            <>
                                <li>
                                    <Link to='/login' className="hover:text-sky-500 hover:underline">Login</Link>
                                </li>
                                <li>
                                    <Link to='/register' onClick={logout} className="hover:text-sky-500 hover:underline">Register</Link>
                                </li>
                            </>
                        )
                        : (
                            <>
                                <li>
                                    <h2 className="">Welcome <span className="text-sky-200">{user.username}</span></h2>
                                </li>
                                <li>
                                    <Link to='/add-task' className="hover:text-sky-500 hover:underline">Add Task</Link>
                                </li>
                                <li>
                                    <Link to='/' onClick={logout} className="hover:text-sky-700 hover:underline">Logout</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}
import { Link } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export function Header() {

    const { isAuthenticated, logout } = useAuth()



    return (
        <header className="flex w-[100dvw] justify-between items-center ">
            <Link to='/' className="p-4 text-3xl hover:text-sky-500">
                Home
            </Link>
            <nav>
                <ul className="flex gap-4 p-4">
                    <li>
                        {!isAuthenticated
                        ? <Link to='/login' className="hover:text-sky-500 hover:underline">Login</Link>
                        : <Link to='/' onClick={logout} className="hover:text-sky-500 hover:underline">Logout</Link>
                        }
                    </li>
                    <li><Link to='/register' className="hover:text-sky-500 hover:underline">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}
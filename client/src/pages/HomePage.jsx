import { Link } from "react-router-dom"
import { Header } from "../components/Header"

export const HomePage = () => {
    return (
        <>
            <Header />
            <main className="flex justify-center items-center">
                <h1>Home Page</h1>
            </main>
        </>
    )
}
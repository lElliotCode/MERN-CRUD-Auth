import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data);
        }
    }

    const logout = async () => {
        try {
            const res = await logoutRequest()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data);
        }
    }

    const signin = async (userCredentials) => {
        
        try {
            const res = await loginRequest(userCredentials)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)

                console.log(res.data)

                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                }
                setIsAuthenticated(true)
                setLoading(false)
                setUser(res.data)

            } catch (error) {
                
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }

        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}

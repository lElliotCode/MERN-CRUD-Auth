import axios from './axios'
axios.defaults.withCredentials = true;

export const registerRequest = (user) => axios.post(`register`, user)

export const loginRequest = (credentials) => axios.post(`login`, credentials)

export const logoutRequest = () => axios.post('/logout')

export const verifyTokenRequest = () => axios.get('/verify')
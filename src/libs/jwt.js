import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const createAccesToken = (payload) => {

    return new Promise((resolve, reject) => {
            jwt.sign(
                payload, // Datos a guardar id Usuario
                process.env.TOKEN_SECRET, // Clave para leer el token
                {
                expiresIn: '1d'
                },
                // CallBack y convertir en Promesa
                (err, token) => {
                    if(err) reject(err)
                    resolve(token)
                })
        })
}
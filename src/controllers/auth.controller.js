import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email, 
            password : passwordHash
        })
    
        const savedUser = await newUser.save()
        const token = createAccesToken( {id: savedUser.id} )
        
        res.cookie('token', token)
        res.json({
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        })
    } catch (e) {
        res.status(500).json( {error: e.message} )
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {

        const userFound = await User.findOne( { email })

        if(!userFound) {
            return res.status(400).json( {error: 'User not found'} )
        }

        const isMatchPassword = await bcrypt.compare(password, userFound.password)

        if(!isMatchPassword) {
            return res.status(400).json( {error: 'Password incorrect'} )
        }

        const token = await createAccesToken( {id: userFound._id} )

        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (e) {
        res.status(500).json( {error: e.message} )
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}
import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {

        const userFound = await UserModel.findOne({email})

        if(userFound) return res.status(400).json(['The email is already in use'])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            username,
            email, 
            password : passwordHash
        })
    
        const savedUser = await newUser.save()
        // const token = createAccesToken( {id: savedUser.id} )
        
        // res.cookie('token', token)
        res.json({
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        })

        console.log(newUser)
    } catch (e) {
        res.status(500).json( {error: e.message} )
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {

        const userFound = await UserModel.findOne( { email })

        if(!userFound) {
            return res.status(400).json( {error: 'Invalid Credential'} )
        }

        const isMatchPassword = await bcrypt.compare(password, userFound.password)

        if(!isMatchPassword) {
            return res.status(400).json( {error: 'Invalid Credential'} )
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
        console.log('User login')
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

export const profile = async (req, res) => {
    const userFound = await UserModel.findById(req.user.id)
    
    if(!userFound) {
    return res.sendStatus(401).json({ message: "User not found"})
    }

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}
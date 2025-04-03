import TaskModel from '../models/task.model.js'
import mongoose from 'mongoose'

export const getTasks = async (req, res) => {
    const tasks = await TaskModel.find({
        user: req.user.id
    }).populate('user')
    res.json({ tasks })
}

export const createTask = async (req, res) => {
    const { title, description, date} = req.body

    try {

        const newTask = new TaskModel ({
            title,
            description,
            date,
            user: req.user.id
        })

        const savedTask = await newTask.save()
        res.json({ savedTask })
        
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

export const getTaskById = async (req, res) => {
    const { id } = req.params

    const taskFound = await TaskModel.findById(id).populate('user')

    if(!taskFound) {
        return res.status(404).json({ message: 'Task not Found'})
    }

    res.json({ taskFound })
}

export const deleteTask = async (req, res) => {
    const { id } = req.params
    const taskFound = await TaskModel.findById(id)

    if(!taskFound) {
        return res.sendStatus(401).json({ message: 'Task not Found'})
    }

    try {
        const some = await TaskModel.deleteOne(taskFound)
        return res.status(200).json( { message: 'Tarea eliminada correctamente'} )
    
    } catch (e) {
        return res.sendStatus(500).json({ message: 'Error in Server'})
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    const {title, description } = req.body

    try {
        const objectId = new mongoose.Types.ObjectId(id);

        const taskUpdated = await TaskModel.findOneAndUpdate(
            { _id: objectId }, 
            { title: title, description: description },
            { new: true}
        )

        if(!taskUpdated) {
            return res.status(404).json({ message : "Task not Found"})
        }

        return res.status(200).json({ taskUpdated })

    } catch (e) {
        return res.status(500).json({ message : e.message})
    }
}
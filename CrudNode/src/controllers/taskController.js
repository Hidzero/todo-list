import taskRepositories from '../repositories/taskRepositories.js';
import taskSchema from '../models/Task.js';
import bcrypt from 'bcrypt';

export async function createTask (req, res) {
    try {
        const newTask = new taskSchema(req.body);
        const savedTask = await newTask.save();

        res.status(201).json({
            statusCode: 201,
            message: "Tarefa criada com sucesso!",
            data: {
                savedTask
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export async function getAllTasks(req, res) {
    try{
        const tasks = await taskRepositories.findAll();
        res.status(200).json(tasks);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function getById(req, res) {
    try {
        const task = await taskRepositories.findById(req.params.id);
        res.status(200).json(task);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function updateTask(req, res) {
    try {
        const task = await taskRepositories.update(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        console.log("Error during update:", error);
        res.status(400).json({ message: error.message });
    }
}



export async function deleteTask(req, res){
    try {
        const deleteTask = await taskRepositories.delete(req.params.id);
        res.status(200).json({message: "Tarefa deletada com sucesso"});
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}
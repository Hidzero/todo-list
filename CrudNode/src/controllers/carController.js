import carRepositories from '../repositories/carRepositories.js';

export async function createCar (req, res) {
    try {
        const car = await carRepositories.create(req.body);
        res.status(201).json(car)
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function getAllCars(req, res) {
    try{
        const cars = await carRepositories.findAll();
        res.status(200).json(cars);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function getById(req, res) {
    try {
        const car = await carRepositories.findById(req.params.id);
        res.status(200).json(car);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function updateCar(req, res){
    try {
        const car = await carRepositories.updateById(req.params.id, req.body);
        res.status(200).json(car);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function deleteCar(req, res){
    try {
        const deleteCars = await carRepositories.deleteById(req.params.id);
        res.status(200).json({message: "Carro deletado com sucesso"});
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}
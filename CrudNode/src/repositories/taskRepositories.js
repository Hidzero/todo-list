import Task from '../models/Task.js';

class TaskRepository {
    async create(userData){
        const task = new Task(userData);
        await task.save();
        return task;
    }
    async findAll(){
        return Task.find();
    }
    async findById(id) {
        return Task.findById(id);
    }
    async update(id, updateData) {
        return Task.findOneAndUpdate({ _id: id }, updateData, { new: true });
    }
   
    async delete(taskData) {
        return Task.findOneAndDelete(taskData)
    }
}

const taskRepositories = new TaskRepository();
export default taskRepositories;
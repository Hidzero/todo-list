import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        getTasks();
    },[]);
    
    async function createTask() {
        const data = {
            description: inputValue,
            completed: false
        };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/task`;
        await axios.post(baseUrl, data)
        .then(response => {
            setTasks([...tasks, { ...data, _id: response.data._id }]);
        }).catch(error => {
            console.log(error);
        });
    }

    async function getTasks() {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/task`;
        await axios.get(baseUrl)
        .then(response => {
            setTasks(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    
    async function deleteTaskFromDB(taskData, index) {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/task/${taskData._id}`;
        await axios.delete(baseUrl)
        .then(() => {
            const updatedTasks = tasks.filter((task, idx) => idx !== index);
            setTasks(updatedTasks);
        }).catch(error => {
            console.log(error);
        });
    }
    
    async function updateTask(taskData) {
        const data = {
            completed: taskData.completed
        };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/task/${taskData._id}`;
        await axios.put(baseUrl, data)
        .catch(error => {
            console.log(error);
        });
    }

    function addTask() {
        if (inputValue.trim() !== '') {
            const newTask = {
                description: inputValue,
                completed: false
            };
            setTasks([...tasks, newTask]);
            createTask();
            setInputValue('');
        }
    };

    function markDone(index) {
        const updatedTasks = tasks.map((task, idx) => {
            if (idx === index) {
                const updatedTask = { ...task, completed: !task.completed };
                updateTask(updatedTask);
                return updatedTask;
            }
            return task;
        });
    
        const sortedTasks = updatedTasks.sort((a, b) => {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        });
    
        setTasks(sortedTasks);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    }
    
    return (
        <div className="app">
            <div className='header'>
                <FontAwesomeIcon icon={faClipboardCheck} className='clipboard-icon' />
                <div className='title'>To-Do List</div>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => markDone(index)}
                            style={{ cursor: 'pointer', marginRight: '10px'}}
                        />
                        <span className='text-description'>{task.description}</span>
                        <FontAwesomeIcon icon={faTrash} id='trash-icon' onClick={() => deleteTaskFromDB(task, index)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

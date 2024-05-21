import React, { useState, useEffect } from 'react';
import '../css/Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        getTasks();
    },[]);
    
    async function createTask() {
        const data = {
            description: inputValue
        };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note`;
        await axios.post(baseUrl, data)
        .then(response => {
            setTasks([...tasks, { ...data, _id: response.data._id }]);
            getTasks();
        }).catch(error => {
            console.log(error);
        });
    }

    async function getTasks() {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note`;
        await axios.get(baseUrl)
        .then(response => {
            setTasks(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    
    async function deleteTaskFromDB(taskData, index) {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note/${taskData._id}`;
        await axios.delete(baseUrl)
        .then(() => {
            const updatedTasks = tasks.filter((task, idx) => idx !== index);
            setTasks(updatedTasks);
            getTasks();
        }).catch(error => {
            console.log(error);
        });
    }    

    function addTask() {
        if (inputValue.trim() !== '') {
            const newTask = {
                description: inputValue
            };
            setTasks([...tasks, newTask]);
            createTask();
            setInputValue('');
        }
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    }
    
    function startEditing(task, index) {
        setEditingIndex(index);
        setEditText(task.description);
    }

    async function saveEdit(task, index) {
        const updatedTask = { ...task, description: editText };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note/${task._id}`;
        try {
            await axios.put(baseUrl, updatedTask);
            const updatedTasks = tasks.map((t, idx) => idx === index ? updatedTask : t);
            setTasks(updatedTasks);
            setEditingIndex(null); 
            setEditText('');
            getTasks();
        } catch (error) {
            console.error("Erro ao salvar as edições:", error);
        }
    }
    
 
    return (
        <div className="app-notes">
            <div className='header'>
                <FontAwesomeIcon icon={faClipboardCheck} className='clipboard-icon' />
                <div className='title'>Notes</div>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new note..."
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                        {editingIndex === index ? (
                            <input
                                className="input-edit"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task, index)}
                            />
                        ) : (
                            <span className='text-description' onClick={() => startEditing(task, index)}>
                                {task.description}
                            </span>
                        )}
                        <FontAwesomeIcon icon={faTrash} id='trash-icon' style={{ cursor: 'pointer', }}onClick={() => deleteTaskFromDB(task, index)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

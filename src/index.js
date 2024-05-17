import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './views/TodoList';
import Notes from './views/Notes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

function Main() {
    const [activeApp, setActiveApp] = useState('todo');

    const handleAppSwitch = (app) => {
        setActiveApp(app);
    };

    return (
        <div className="main-container">
            <div className="button-container">
                <button 
                    onClick={() => handleAppSwitch('todo')}
                    style={{ backgroundColor: activeApp === 'notes' ? 'grey' : 'white', color: activeApp === 'notes' ? 'white' : 'black' }}
                >
                    Notes
                </button>
                <button 
                    onClick={() => handleAppSwitch('notes')}
                    style={{ backgroundColor: activeApp === 'todo' ? 'grey' : 'white', color: activeApp === 'todo' ? 'white' : 'black' }}
                >
                    Todo
                </button>
            </div>
            <div className="app-wrapper">
                <Notes className={activeApp === 'notes' ? 'active' : ''} />
                <App className={activeApp === 'todo' ? 'active' : ''} />
                <div className="cover" style={{ right: activeApp === 'notes' ? '50%' : '0' }}></div>
            </div>
        </div>
    );
}

reportWebVitals();

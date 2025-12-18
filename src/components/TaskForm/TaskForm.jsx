import React, { useState } from 'react';
import './TaskForm.css';
import { useTaskStore } from '../../store/useTaskStore';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() && !about.trim()) {
            alert('Введите текст!');
            return;
        }

        addTask(title, about);
        setTitle('');
        setAbout('');
    };

    return (
        <div className="upper">
            <div className="upper-left">
        <textarea
            id="cardTitle"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
                <textarea
                    id="cardAbout"
                    placeholder="About..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            <div className="upper-right">
                <button className="btn" id="saveCard" onClick={handleSubmit}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M20 8V32M8 20H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
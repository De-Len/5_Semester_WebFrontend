import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import './ConfirmWindow.css';

const ConfirmWindow = () => {
    const {
        showConfirmWindow,
        closeConfirmWindow,
        deleteTask
    } = useTaskStore();

    const handleConfirm = () => {
        deleteTask();
    };

    if (!showConfirmWindow) return null;

    return (
        <>
            <div className="confirm-overlay active" onClick={closeConfirmWindow}></div>
            <div className="confirm-window active">
                <p>Delete this task?</p>
                <div className="confirm-buttons">
                    <button id="confirmYes" onClick={handleConfirm}>
                        Yes
                    </button>
                    <button id="confirmNo" onClick={closeConfirmWindow}>
                        No
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmWindow;
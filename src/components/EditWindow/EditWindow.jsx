import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import './EditWindow.css';

const EditWindow = () => {
    const {
        showEditWindow,
        editData,
        setEditData,
        closeEditWindow,
        updateTask,
        addTask,
        editingTaskId
    } = useTaskStore();

    const handleSave = () => {
        if (editingTaskId !== null) {
            // Редактируем существующую задачу
            updateTask();
        } else {
            // Создаем новую задачу из окна редактирования
            if (!editData.miniInput.trim() && !editData.maxInput.trim()) {
                alert('Введите текст!');
                return;
            }
            addTask(editData.miniInput, editData.maxInput);
        }
    };

    const handleInputChange = (field, value) => {
        setEditData({ [field]: value });
    };

    if (!showEditWindow) return null;

    return (
        <>
            <div className="overlay active" onClick={closeEditWindow}></div>
            <div className="edit-window active">
        <textarea
            className="mini-input"
            placeholder="Mini Input..."
            value={editData.miniInput}
            onChange={(e) => handleInputChange('miniInput', e.target.value)}
        />
                <textarea
                    className="max-input"
                    placeholder="Max Input..."
                    value={editData.maxInput}
                    onChange={(e) => handleInputChange('maxInput', e.target.value)}
                />
                <div className="buttons">
                    <button id="cancelBtn" onClick={closeEditWindow}>
                        Cancel
                    </button>
                    <button id="saveBtn" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditWindow;
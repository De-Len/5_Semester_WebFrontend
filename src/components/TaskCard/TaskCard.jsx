import React, { useState, useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTaskStore } from '../../store/useTaskStore';
import './TaskCard.css';

const TaskCard = ({ task, index }) => {
    const [showActions, setShowActions] = useState(false);
    const ref = useRef(null);

    const {
        openEditWindow,
        openShareWindow,
        openConfirmWindow,
        togglePinTask,
        moveTask
    } = useTaskStore();

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { index, id: task.id },
        canDrag: !task.isPinned, // Нельзя перетаскивать закрепленные
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleHover = useCallback((item) => {
        if (!ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;

        // Не делаем ничего, если перемещаем в ту же позицию
        if (dragIndex === hoverIndex) return;

        // Перемещаем задачу
        moveTask(dragIndex, hoverIndex);
        item.index = hoverIndex;
    }, [index, moveTask]);

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: handleHover,
    });

    const setRefs = useCallback((node) => {
        ref.current = node;

        // Применяем drag и drop
        drag(node);
        drop(node);
    }, [drag, drop]);

    const handleCardClick = (e) => {
        if (e.target.closest('.delete-btn')) return;
        setShowActions(!showActions);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        openEditWindow(task);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        openShareWindow();
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        openConfirmWindow(task.id);
    };

    const handlePinClick = (e) => {
        e.stopPropagation();
        togglePinTask(task.id);
    };

    return (
        <div
            ref={setRefs}
            className={`task-card ${showActions ? 'show-actions' : ''} ${task.isPinned ? 'pinned' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={handleCardClick}
        >
            <div className="card-content">
                <div>
                    <h3>{task.title || 'Untitled'}</h3>
                    <p>{task.about || 'No description'}</p>
                </div>
                <button
                    className="delete-btn"
                    onClick={handleDeleteClick}
                    aria-label="Delete task"
                >
                    &times;
                </button>
            </div>

            <div className="card-under">
                <button
                    className="pin-btn"
                    onClick={handlePinClick}
                    title={task.isPinned ? "Unpin" : "Pin"}
                    aria-label={task.isPinned ? "Unpin task" : "Pin task"}
                >
                    {task.isPinned ? '📌' : '📍'}
                </button>
                <button
                    className="share-btn"
                    onClick={handleShareClick}
                    aria-label="Share task"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                </button>
                <button
                    className="edit-btn"
                    onClick={handleEditClick}
                    aria-label="Edit task"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
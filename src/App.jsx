import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTaskStore } from './store/useTaskStore';
import TaskForm from './components/TaskForm/TaskForm';
// import TaskCard from './components/TaskCard/TaskCard';
// import EditWindow from './components/EditWindow/EditWindow';
// import ConfirmWindow from './components/ConfirmWindow/ConfirmWindow';
// import ShareWindow from './components/ShareWindow/ShareWindow';
import './App.css';

function App() {
    const tasks = useTaskStore((state) => state.tasks);

    // Разделяем задачи на закрепленные и обычные
    const pinnedTasks = tasks.filter(task => task.isPinned);
    const regularTasks = tasks.filter(task => !task.isPinned);

    return (
        <DndProvider backend={HTML5Backend}>
            <section className="container">
                <TaskForm />

                {/* Закрепленные задачи */}
                {pinnedTasks.length > 0 && (
                    <div className="pinned-section">
                        <h3 className="section-title">
                            📌 Pinned Tasks ({pinnedTasks.length}/3)
                        </h3>
                        {pinnedTasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={tasks.findIndex(t => t.id === task.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Обычные задачи */}
                <div className="regular-section">
                    {tasks.length === 0 ? (
                        <div id="noTasksArticle">
                            no Tasks
                        </div>
                    ) : (
                        <>
                            {regularTasks.length > 0 && (
                                <h3 className="section-title">
                                    📋 All Tasks
                                </h3>
                            )}
                            {regularTasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={tasks.findIndex(t => t.id === task.id)}
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* Модальные окна */}
                <EditWindow />
                <ConfirmWindow />
                <ShareWindow />
            </section>
        </DndProvider>
    );
}

export default App;
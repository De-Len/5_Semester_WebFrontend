import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
    persist(
        (set, get) => ({
            tasks: [],
            pinnedTasks: [],

            addTask: (title, about) => {
                const newTask = {
                    id: Date.now(),
                    title,
                    about,
                    isPinned: false,
                    miniInput: '',
                    maxInput: '',
                };

                set((state) => ({
                    tasks: [...state.tasks, newTask]
                }));
            },

            deleteTask: (id) => {
                set((state) => ({
                    tasks: state.tasks.filter(task => task.id !== id),
                    pinnedTasks: state.pinnedTasks.filter(task => task.id !== id)
                }));
            },

            editTask: (id, updates) => {
                const updateTaskInList = (list) =>
                    list.map(task =>
                        task.id === id ? { ...task, ...updates } : task
                    );

                set((state) => ({
                    tasks: updateTaskInList(state.tasks),
                    pinnedTasks: updateTaskInList(state.pinnedTasks)
                }));
            },

            pinTask: (id) => {
                const state = get();
                const taskToPin = [...state.tasks, ...state.pinnedTasks].find(t => t.id === id);

                if (!taskToPin) return;

                // Проверяем, не достигнут ли лимит в 3 закрепленных задачи
                if (state.pinnedTasks.length >= 3 && !taskToPin.isPinned) {
                    alert('Максимум можно закрепить 3 задачи!');
                    return;
                }

                if (taskToPin.isPinned) {
                    set({
                        pinnedTasks: state.pinnedTasks.filter(t => t.id !== id),
                        tasks: [...state.tasks, { ...taskToPin, isPinned: false }]
                    });
                } else {
                    set({
                        tasks: state.tasks.filter(t => t.id !== id),
                        pinnedTasks: [...state.pinnedTasks, { ...taskToPin, isPinned: true }]
                    });
                }
            },

            moveTask: (dragIndex, hoverIndex, isPinnedSection) => {
                if (isPinnedSection) {
                    set((state) => {
                        const newPinnedTasks = [...state.pinnedTasks];
                        const [draggedTask] = newPinnedTasks.splice(dragIndex, 1);
                        newPinnedTasks.splice(hoverIndex, 0, draggedTask);
                        return { pinnedTasks: newPinnedTasks };
                    });
                } else {
                    set((state) => {
                        const newTasks = [...state.tasks];
                        const [draggedTask] = newTasks.splice(dragIndex, 1);
                        newTasks.splice(hoverIndex, 0, draggedTask);
                        return { tasks: newTasks };
                    });
                }
            }
        }),
        {
            name: 'task-storage',
        }
    )
);
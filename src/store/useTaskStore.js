import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
    persist(
        (set, get) => ({
            tasks: [],

            editingTaskId: null,

            deletingTaskId: null,

            showEditWindow: false,
            showShareWindow: false,
            showConfirmWindow: false,

            editData: {
                miniInput: '',
                maxInput: ''
            },

            openEditWindow: (task = null) => {
                if (task) {
                    set({
                        showEditWindow: true,
                        editingTaskId: task.id,
                        editData: {
                            miniInput: task.title,
                            maxInput: task.about
                        }
                    });
                } else {
                    set({
                        showEditWindow: true,
                        editingTaskId: null,
                        editData: {
                            miniInput: '',
                            maxInput: ''
                        }
                    });
                }
            },

            closeEditWindow: () => {
                set({
                    showEditWindow: false,
                    editingTaskId: null,
                    editData: { miniInput: '', maxInput: '' }
                });
            },

            openShareWindow: () => {
                set({ showShareWindow: true });
            },

            closeShareWindow: () => {
                set({ showShareWindow: false });
            },

            openConfirmWindow: (taskId) => {
                set({
                    showConfirmWindow: true,
                    deletingTaskId: taskId
                });
            },

            closeConfirmWindow: () => {
                set({
                    showConfirmWindow: false,
                    deletingTaskId: null
                });
            },

            // Основные операции с задачами
            addTask: (title, about) => {
                const newTask = {
                    id: Date.now(),
                    title: title.trim(),
                    about: about.trim(),
                    isPinned: false,
                    miniInput: '',
                    maxInput: ''
                };

                set((state) => ({
                    tasks: [...state.tasks, newTask],
                    showEditWindow: false,
                    editData: { miniInput: '', maxInput: '' }
                }));
            },

            updateTask: () => {
                const { editingTaskId, editData } = get();

                if (!editData.miniInput.trim() && !editData.maxInput.trim()) {
                    alert('Введите текст!');
                    return;
                }

                set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === editingTaskId
                            ? {
                                ...task,
                                title: editData.miniInput,
                                about: editData.maxInput,
                                miniInput: editData.miniInput,
                                maxInput: editData.maxInput
                            }
                            : task
                    ),
                    showEditWindow: false,
                    editingTaskId: null,
                    editData: { miniInput: '', maxInput: '' }
                }));
            },

            deleteTask: () => {
                const { deletingTaskId } = get();

                set((state) => ({
                    tasks: state.tasks.filter(task => task.id !== deletingTaskId),
                    showConfirmWindow: false,
                    deletingTaskId: null
                }));
            },

            togglePinTask: (taskId) => {
                const state = get();
                const task = state.tasks.find(t => t.id === taskId);

                if (!task) return;

                const pinnedCount = state.tasks.filter(t => t.isPinned).length;

                // Если пытаемся закрепить, а уже есть 3 закрепленных
                if (!task.isPinned && pinnedCount >= 3) {
                    alert('Максимум можно закрепить 3 задачи!');
                    return;
                }

                set({
                    tasks: state.tasks.map(t =>
                        t.id === taskId ? { ...t, isPinned: !t.isPinned } : t
                    )
                });
            },

            setEditData: (data) => {
                set((state) => ({
                    editData: { ...state.editData, ...data }
                }));
            },

            moveTask: (dragIndex, hoverIndex) => {
                set((state) => {
                    const regularTasks = state.tasks.filter(task => !task.isPinned);
                    const pinnedTasks = state.tasks.filter(task => task.isPinned);

                    if (dragIndex < regularTasks.length && hoverIndex < regularTasks.length) {
                        const [draggedTask] = regularTasks.splice(dragIndex, 1);
                        regularTasks.splice(hoverIndex, 0, draggedTask);
                    }

                    return {
                        tasks: [...pinnedTasks, ...regularTasks]
                    };
                });
            }
        }),
        {
            name: 'tasks-storage',
        }
    )
);
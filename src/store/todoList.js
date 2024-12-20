import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTodoStore = create(devtools((set, get) => ({
  tasks: [],
  filters: {
    showTodo: true,
    showInProgress: true,
    showDone: true,
    taskLike: "",
  },
  setTasks: (tasks) => set({ tasks }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  getFilteredTasks: () => {
    const { tasks, filters } = get();
    const { showTodo, showInProgress, showDone, taskLike } = filters;
    return tasks.filter(task => {
      const statusMatch = (task.status === "TODO" && showTodo) ||
                          (task.status === "IN PROGRESS" && showInProgress) ||
                          (task.status === "DONE" && showDone);
      const taskMatch = task.task.toLowerCase().includes(taskLike.toLowerCase());
      return statusMatch && taskMatch;
    });
  },
})));

export { useTodoStore };

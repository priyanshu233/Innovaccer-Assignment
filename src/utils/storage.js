const STORAGE_KEY = 'todo-app-tasks';

export const loadTodos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure we return an array
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    // Ensure todos is an array before saving
    if (Array.isArray(todos)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      console.log('Todos saved to localStorage:', todos.length, 'items');
    }
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

import { createSlice } from '@reduxjs/toolkit';

// Helper functions to interact with local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Could not load state', e);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: loadState(),
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveState(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
      saveState(state.todos);
    },
   },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

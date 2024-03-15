import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "types/types";
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "services/TodoService";

interface IinitialState {
  todos: ITodo[];
}

const initialState: IinitialState = {
  todos: getTodosFromLocalStorage(),
};

export const todosSlice = createSlice({
  name: "todo-list",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: ITodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      saveTodosToLocalStorage(state.todos);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: number; updatedText: string }>
    ) => {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.updatedText;
      }
      saveTodosToLocalStorage(state.todos);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveTodosToLocalStorage(state.todos);
    },
    showAllItems: (state) => {
      state.todos = getTodosFromLocalStorage();
    },
    showAllCompleted: (state) => {
      const todos = getTodosFromLocalStorage();
      state.todos = todos.filter((item) => item.completed);
    },
    showAllNotCompleted: (state) => {
      const todos = getTodosFromLocalStorage();
      state.todos = todos.filter((item) => !item.completed);
    },
    updateListOrder: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newTodos = [...state.todos];
      const [draggedItem] = newTodos.splice(dragIndex, 1);
      newTodos.splice(hoverIndex, 0, draggedItem);
      state.todos = newTodos;
      saveTodosToLocalStorage(newTodos);
    },
  },
});

export default todosSlice.reducer;

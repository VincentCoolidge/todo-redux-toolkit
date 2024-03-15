import { ITodo } from "types/types";

const getTodosFromLocalStorage = (): ITodo[] => {
  const todosStr = localStorage.getItem("todos");
  return todosStr ? JSON.parse(todosStr) : [];
};

const saveTodosToLocalStorage = (todos: ITodo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export { getTodosFromLocalStorage, saveTodosToLocalStorage };

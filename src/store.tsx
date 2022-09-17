import React from 'react';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Native React implementation

const UpdateTodos = (todos: Todo[]) => React.useState([...todos]);
type UpdateTodosType = ReturnType<typeof UpdateTodos>;

// export type TodosType = UpdateTodosType[0];
// export type SetTodosType = UpdateTodosType[1];

// Creating Context

const TodosContext = React.createContext<UpdateTodosType | null>(null);

export const useTodosContext = () => React.useContext(TodosContext)!;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TodosContext.Provider value={UpdateTodos([])}>
      {children}
    </TodosContext.Provider>
  );
};

// Creating Custom Hook

const useTodos = (initial: Todo[]) => {
  const [todos, setTodos] = React.useState<Todo[]>(initial);
  const [newTodo, setNewTodo] = React.useState('');

  return {
    todos,
    setTodos,
    newTodo,
    setNewTodo,
    addTodo() {
      setTodos((tl) => addTodo(tl, newTodo));
    },
    updateTodos(id: number, text: string) {
      setTodos((tl) => updateTodo(tl, id, text));
    },
    toggleTodo(id: number) {
      setTodos((tl) => toggleTodo(tl, id));
    },
    removeTodo(id: number) {
      setTodos((tl) => removeTodo(tl, id));
    },
    load(data: Todo[]) {
      setTodos(data);
    },
  };
};

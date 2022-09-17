import * as React from 'react';
import { Button, Input, Flex, Checkbox, Heading } from '@chakra-ui/react';
import { removeTodo, toggleTodo, updateTodo, useTodosContext } from '../store';

function TodoListItems() {
  const [todos, updateTodos] = useTodosContext();
  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox onClick={() => updateTodos(toggleTodo(todos, todo.id))} />
          <Input
            onChange={(evt) => {
              updateTodos(updateTodo(todos, todo.id, evt.target.value));
            }}
            mx={2}
            value={todo.text}
          />
          <Button
            onClick={() => {
              updateTodos(removeTodo(todos, todo.id));
            }}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;

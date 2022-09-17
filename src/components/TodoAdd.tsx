import * as React from 'react';
import { Button, Input, Grid } from '@chakra-ui/react';
import { addTodo, useTodosContext } from '../store';

function TodoAdd() {
  const [todos, updateTodos] = useTodosContext();
  const [newTodo, setNewTodo] = React.useState('');

  return (
    <Grid pt={2} mt={5} templateColumns='5fr 1fr' columnGap='3'>
      <Input
        value={newTodo}
        onChange={(evt) => setNewTodo(evt.target.value)}
        placeholder='New todo'
      />
      <Button
        onClick={() => {
          updateTodos(addTodo(todos, newTodo));
          setNewTodo('');
        }}
      >
        Add Todo
      </Button>
    </Grid>
  );
}

export default TodoAdd;

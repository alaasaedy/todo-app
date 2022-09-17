import * as React from 'react';
import { Button, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useTodosContext } from '../store';

function TopBar() {
  const [, updateTodos] = useTodosContext();
  const onLoad = () => {
    fetch(
      'https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json'
    )
      .then((res) => res.json())
      .then((data) => updateTodos(data));
  };

  return (
    <Grid pt={2} mb={5} templateColumns='1fr 1fr' columnGap='3'>
      <ColorModeSwitcher />
      <Button onClick={onLoad}>Load</Button>
    </Grid>
  );
}

export default TopBar;

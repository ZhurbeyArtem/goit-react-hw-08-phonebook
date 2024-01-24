import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as filterAction } from '../redux/filter/filter.slice';

import { getFilter } from '../redux/filter/selectors';
import { Container } from '@mui/material';
import { Input } from 'styles/input';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <Container>
      <Input
        fullWidth
        placeholder="Find contact by name"
        type="text"
        defaultValue={filter}
        onInput={e => dispatch(filterAction.changeFilter(e.target.value))}
        sx={{ mb: 2 }}
      />
    </Container>
  );
};

export default Filter;

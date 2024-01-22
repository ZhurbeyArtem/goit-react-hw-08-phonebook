import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as filterAction } from '../../redux/filter/filter.slice';

import s from './style.module.css';
import { getFilter } from '../../redux/filter/selectors';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <label className={s.formLabel}>
        Find contact by name
        <input
          type="text"
          defaultValue={filter}
          onInput={e => dispatch(filterAction.changeFilter(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Filter;

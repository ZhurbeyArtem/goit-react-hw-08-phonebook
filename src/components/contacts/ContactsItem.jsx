import React from 'react';
import { useDispatch } from 'react-redux';

import s from './style.module.css';
import { fetchRemoveContact } from '../../redux/contacts/api';

const ContactsItem = ({ name, phone, id }) => {
  const dispatch = useDispatch();
  return (
    <li>
      {name} {phone}
      <button
        className={s.btn}
        type="button"
        onClick={() => dispatch(fetchRemoveContact(id))}
      >
        remove
      </button>
    </li>
  );
};

export default ContactsItem;

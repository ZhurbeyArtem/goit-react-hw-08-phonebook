import ContactsForm from './form/ContactsForm';
import Filter from './filters/Filter';
import ContactList from './contacts/ContactList';

import s from 'index.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contacts/api';
import { useEffect } from 'react';
import { getError, getLoading } from '../redux/contacts/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.app}>
      <h1>Phonebook</h1>
      <ContactsForm />
      
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      <ContactList />
    </div>
  );
};

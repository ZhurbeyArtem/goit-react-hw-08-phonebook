import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getError, getLoading } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/api';
import ContactList from 'components/contacts/ContactList';
import { ContactsContainer } from './Contacts.styled';
import ContactsForm from 'components/form/ContactsForm';
import Filter from 'components/Filter';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container sx={ContactsContainer}>
      <h1>Phonebook</h1>
      <ContactsForm />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      <ContactList />
    </Container>
  );
};

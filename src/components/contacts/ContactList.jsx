import React from 'react';
import { useSelector } from 'react-redux';

import ContactsItem from './ContactsItem';
import s from './style.module.css';
import { getContacts } from '../../redux/contacts/selectors';
import { getFilter } from '../../redux/filter/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <ul className={s.list}>
      {filteredContacts().map(e => {
        return (
          <ContactsItem key={e.id} id={e.id} name={e.name} phone={e.phone} />
        );
      })}
    </ul>
  );
};

export default ContactList;

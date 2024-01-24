import React from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import ContactsItem from './ContactsItem';
import { getContacts } from '../../redux/contacts/selectors';
import { getFilter } from '../../redux/filter/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <FixedSizeList
      height={400}
      itemSize={70}
      itemCount={filteredContacts.length}
      overscanCount={3}
    >
      {({ index, style }) => (
        <div>
          <ContactsItem
            key={filteredContacts[index].id}
            id={filteredContacts[index].id}
            name={filteredContacts[index].name}
            number={filteredContacts[index].number}
            style={style}
          />
        </div>
      )}
    </FixedSizeList>
  );
};

export default ContactList;

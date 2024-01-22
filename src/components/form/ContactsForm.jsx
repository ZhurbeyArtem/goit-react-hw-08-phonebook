import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import { getContacts } from '../../redux/contacts/selectors';
import { fetchAddContacts } from '../../redux/contacts/api';

import s from './style.module.css';

const ContactsForm = () => {
  const  contacts  = useSelector(getContacts);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, phone } = formData;
    const isExist = contacts.filter(
      e =>
        e.name.toLowerCase() === name.toLowerCase() ||
        e.phone.toLowerCase() === phone.toLowerCase()
    );
    if (isExist.length > 0) {
      Notify.failure(`${name} or ${phone} is already in contacts`);
      return contacts;
    }
    dispatch(fetchAddContacts({ name, phone }));
    setFormData({ name: '', phone: '' });
    e.target.reset();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.formLabel}>
          Name
          <input
            type="text"
            name="name"
            required
            onChange={handleInputChange}
            value={formData.name}
          />
        </label>
        <label className={s.formLabel}>
          Number
          <input
            type="tel"
            name="phone"
            required
            onChange={handleInputChange}
            value={formData.phone}
          />
        </label>

        <button type="submit" className={s.formBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;

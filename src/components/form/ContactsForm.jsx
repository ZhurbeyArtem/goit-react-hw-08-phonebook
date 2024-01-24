import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { Button, Container, Grid, Typography } from '@mui/material';


import { getContacts } from '../../redux/contacts/selectors';
import { fetchAddContacts } from '../../redux/contacts/api';
import { btn, container } from './ContactsForm.styled';
import { Input } from 'styles/input';

const ContactsForm = () => {
  const contacts = useSelector(getContacts);

  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formData;
    const isExist = contacts.filter(
      e =>
        e.name.toLowerCase() === name.toLowerCase() ||
        e.number.toLowerCase() === number.toLowerCase()
    );
    if (isExist.length > 0) {
      Notify.failure(`${name} or ${number} is already in contacts`);
      return contacts;
    }
    dispatch(fetchAddContacts({ name, number }));
    setFormData({ name: '', number: '' });
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
    <Container sx={container}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Name</Typography>
            <Input
              fullWidth
              type="text"
              name="name"
              required
              onChange={handleInputChange}
              value={formData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Number</Typography>
            <Input
              fullWidth
              type="tel"
              name="number"
              required
              onChange={handleInputChange}
              value={formData.number}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={btn}>
              Add contact
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactsForm;

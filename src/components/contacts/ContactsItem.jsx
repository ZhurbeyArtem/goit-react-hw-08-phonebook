import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  fetchRemoveContact,
  fetchUpdateContact,
} from '../../redux/contacts/api';
import { Notify } from 'notiflix';
import { getContacts } from '../../redux/contacts/selectors';

const ContactsItem = ({ id, name, number, style }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);
  const contacts = useSelector(getContacts);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const changedName = name !== editedName;
      const changedNumber = number !== editedNumber;
      let isExist = null;

      if (changedName && changedNumber) {
        isExist = contacts.filter(
          e =>
            e.name.toLowerCase() === editedName.toLowerCase() ||
            e.number.toLowerCase() === editedNumber.toLowerCase()
        );
      } else if (changedName) {
        isExist = contacts.filter(
          e => e.name.toLowerCase() === editedName.toLowerCase()
        );
      } else if (changedNumber) {
        isExist = contacts.filter(
          e => e.number.toLowerCase() === editedNumber.toLowerCase()
        );
      } else {
        setEditing(false);
        return;
      }
      if (isExist.length > 0) {
        Notify.failure(
          `${editedName} or ${editedNumber} is already in contacts`
        );
        setEditedName(name);
        setEditedNumber(number);
        return;
      }
      await dispatch(
        fetchUpdateContact({ id, name: editedName, number: editedNumber })
      );
    } catch (e) {
      console.log(e);
      Notify.failure('Opps something happened wrong');
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedNumber(number);
    setEditing(false);
  };

  return (
    <ListItem style={style} disablePadding key={id} component="div">
      <ListItemButton>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Name"
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Number"
              value={editedNumber}
              onChange={e => setEditedNumber(e.target.value)}
            />
            <IconButton onClick={handleSave} aria-label="save">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} aria-label="cancel">
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <ListItemText primary={`${editedName} ${editedNumber}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
                <EditIcon />
                <ArrowDropDownIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => dispatch(fetchRemoveContact(id))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ContactsItem;

import { Auth } from 'pages/Auth';
import { Contacts } from 'pages/Contacts/Contacts';

export const privateRouter = [
  {
    Element: Contacts,
    path: '/',
  },
];

export const publicRouter = [
  {
    path: '/register',
    Element: Auth,
  },
  {
    path: '/login',
    Element: Auth,
  },
];

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarMain = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  gap: 10px;
  padding: 10px;
  justify-content: end;
`;

export const NLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 800;
  text-decoration: none;
  color: black;
  &.active {
    color: red;
  }
`;

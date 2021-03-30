import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='Nav'>
      <NavLink to='/' exact>
        HOME
      </NavLink>

      {user && (
        <NavLink to='/create' exact>
          CREATE
        </NavLink>
      )}

      {!user && (
        <>
          <NavLink to='/login' exact>
            LOGIN
          </NavLink>
          <NavLink to='/signup' exact>
            SIGN UP
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Nav;

import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);
  // ---------------------------------
  const inputStyle = { display: 'block', marginBottom: '20px', width: '300px' };
  const loginBlock = { textAlign: 'center' };
  const errorMsg = { color: 'red', fontSize: '24px' };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('data is', data);
      if (data.message) {
        setError(data.message[0].messages[0].message);
        return; //Stop execution
      }
      setUser(data);
    } catch (err) {
      setError('Something went wrong mister ' + err);
    }
  };

  return (
    <div style={loginBlock}>
      <h2 style={{ color: 'white' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <center>
          <input
            style={inputStyle}
            type='email'
            value={email}
            onChange={(event) => {
              setError('');
              setEmail(event.target.value);
            }}
            placeholder='Email'
          />{' '}
          <input
            style={inputStyle}
            type='password'
            value={password}
            onChange={(event) => {
              setError('');
              setPassword(event.target.value);
            }}
            placeholder='Password'
          />
          <button>Login</button>
        </center>
      </form>

      {error && <p style={errorMsg}>{error}</p>}
    </div>
  );
};

export default Login;

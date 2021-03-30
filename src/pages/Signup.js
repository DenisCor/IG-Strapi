import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  //-----------------------------
  const inputStyle = { display: 'block', marginBottom: '20px', width: '300px' };
  const signupBlock = { textAlign: 'center' };
  const errorMsg = { color: 'red', fontSize: '24px' };
  //------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:1337/auth/local/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
      console.log('signup data', data);

      setUser(data);
    } catch (err) {
      setError('Something went wrong ' + err);
    }
  };

  return (
    <div style={signupBlock}>
      <h2 style={{ color: 'white' }}>SignUp</h2>
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
          />

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
          <button>SignUp</button>
        </center>
      </form>

      {error && <p style={errorMsg}>{error}</p>}
    </div>
  );
};

export default Signup;

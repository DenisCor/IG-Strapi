import React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Create = (props) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  console.log('file', file);

  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('Please Log in first !');
      return;
    }

    if (!description) {
      setError('Please add a description');
      return;
    }
    if (!file) {
      setError('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify({ description }));
    formData.append('files.image', file);

    try {
      // throw 'error';
      const response = await fetch('http://localhost:1337/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('data: ', data);
    } catch (err) {
      console.log('error or exception: ', err);
      setError(err);
    }
    props.history.push('/');
  };

  return (
    <div className='Create'>
      <h2>Create</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Description'
          value={description}
          onChange={(event) => {
            setError('');
            setDescription(event.target.value);
          }}
        />

        <input
          type='file'
          placeholder='Add a File'
          onChange={(event) => {
            setError('');
            setFile(event.target.files[0]);
          }}
        />

        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default Create;

import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/Post';
import { UserContext } from '../context/UserContext';

const SinglePost = ({ match, history }) => {
  const { id } = match.params;

  const { user, setUser } = useContext(UserContext);
  console.log('user', user);
  console.log('setUser', setUser);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  //Edit form  state
  const [description, setDescription] = useState('');

  const fetchPost = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`);
    const data = await response.json();
    console.log('data: ', data);
    setPost(data);
    setLoading(false);
    setDescription(data.description);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    const data = await response.json();
    history.push('/');
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({ description }),
    });

    const data = await response.json();
    fetchPost();
    console.log('handleEditSubmit data', data);
    history.push('/');
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post.id) {
    return <h1 style={{ color: 'red' }}>404 ERROR - ID doesnt exist!</h1>;
  } else {
    return (
      <div>
        {loading && <p>Loading...</p>}

        {!loading && (
          <>
            <Post
              description={post.description}
              likes={post.likes}
              image={post.image && post.image[0].url}
            />

            {user && (
              <>
                {' '}
                <button onClick={handleDelete}>DELETE POST</button>
                <button onClick={() => setEdit(true)}>EDIT POST</button>
                {edit && (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder='New Description'
                    />
                    <button>CONFIRM</button>
                  </form>
                )}{' '}
              </>
            )}
          </>
        )}
      </div>
    );
  }
};

export default SinglePost;

import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts');
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className='Home'>
      {posts.map((post) => (
        <Link to={`/${post.id}`}>
          <Post
            post={post}
            likes={post.likes}
            description={post.description}
            image={post.image && post.image[0].url}
          />
        </Link>
      ))}
    </div>
  );
};

export default Home;

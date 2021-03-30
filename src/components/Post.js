import React from 'react';

const API_URL = 'http://localhost:1337';
const formatImageUrl = (url) => `${API_URL}${url}`;

const Post = ({ description, likes, image }) => {
  return (
    <div className='Post'>
      <img
        alt='photo description'
        className='PostImage'
        src={formatImageUrl(image)}
      />
      <h4> {description} </h4>
      <div>
        <span>Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Post;

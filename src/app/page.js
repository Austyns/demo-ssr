// app/page.js

import React from 'react';

// This is a React Server Component (RSC)
const Home = async () => {
  // Simulate fetching data from an API or database
  const message = 'This content is rendered on the server side!';
  
  return (
    <div>
      <h1>Server-Side Rendering Demo with Next.js 13</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;

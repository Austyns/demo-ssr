// pages/index.js

import React from 'react';

// The `getServerSideProps` function runs on the server before rendering the page.
export async function getServerSideProps() {
  try {
    // Fetch data from the API
    const res = await fetch('https://6800b624b72e9cfaf7286802.mockapi.io/api/v1/User');

    // Check if the response is valid
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const users = await res.json();

    // Return the data as props to the component
    return {
      props: { users },
    };
  } catch (error) {
    console.error(error);
    // In case of an error, return an empty array to avoid undefined
    return {
      props: { users: [] },
    };
  }
}

const Home = ({ users }) => {
  // Check if users is an array before mapping over it
  if (!Array.isArray(users)) {
    return <div>Error: Failed to load users.</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

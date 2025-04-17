// pages/login.js
import { useState } from 'react';

export default function Login({ error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form method="POST">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  if (context.req.method === 'POST') {
    const body = await new Promise((resolve, reject) => {
      let data = '';
      context.req.on('data', chunk => data += chunk);
      context.req.on('end', () => {
        try {
          const parsed = new URLSearchParams(data);
          resolve({
            email: parsed.get('email'),
            password: parsed.get('password'),
          });
        } catch (err) {
          reject(err);
        }
      });
    });

    const { email, password } = body;

    const reqBody = {
      createdAt: new Date().toISOString(),
      name: email, // You can use full name if available
      username: email,
      password: password,
    };

    try {
      const res = await fetch('https://6800b624b72e9cfaf7286802.mockapi.io/api/v1/Usersss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });

      if (res.ok) {
        // In a real app you'd verify credentials before allowing redirect
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      } else {
        return {
          props: {
            error: 'Login failed. Try again.',
          },
        };
      }
    } catch (error) {
      return {
        props: {
          error: 'Server error. Please try later.',
        },
      };
    }
  }

  return { props: {} };
}

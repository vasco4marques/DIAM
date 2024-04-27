import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

export default function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function register() {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      fetch(`${BACKEND_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }).then((res) => {
        if (res.ok) {
          alert('Registered');
        } else {
          alert('Failed to register');
        }
        navigate('/home');
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-row items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center gap-[5rem] p-10 bg-white rounded-md">
        <h1 className="mb-5 text-4xl">Welcome</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between w-full gap-x-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-2 border-2 border-black border-solid rounded-md"
            />
          </div>
          <div className="flex flex-row justify-between w-full gap-x-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 border-2 border-black border-solid rounded-md"
            />
          </div>
          <div className="flex flex-row justify-between w-full gap-x-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 border-2 border-black border-solid rounded-md"
            />
          </div>
          <button className="p-2 text-black bg-blue-500 border-2 border-black rounded-md hover:bg-[#ddd] transition-all duration-300" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

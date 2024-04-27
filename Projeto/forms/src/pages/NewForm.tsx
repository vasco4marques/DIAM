import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_API = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

export default function NewForm() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
  
    function createForm() {
      if (title === '') {
        alert('Please fill in all fields');
        return;
      }
      try {
        fetch(`${BACKEND_API}/forms/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        }).then((res) => {
          if (res.ok) {
            alert('Created form successfully!');
            navigate(-1);
          } else {
            alert('Failed to create form. Please try again.');
          }
        //   navigate('/home');
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-[5rem] p-10 bg-white rounded-md">
          <h1 className="mb-5 text-4xl">New Form</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between w-full gap-x-2">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-2 border-2 border-black border-solid rounded-md"
              />
            </div>
            <div className="flex flex-row justify-between w-full gap-x-2">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 border-2 border-black border-solid rounded-md"
              />
            </div>
            <button className="p-2 text-black bg-blue-500 border-2 border-black rounded-md hover:bg-[#ddd] transition-all duration-300" onClick={createForm}>
              Create Form
            </button>
          </div>
        </div>
      </div>
    );
}


"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CreateTaskComponent = () => {
  const [name, setName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    fetch("/api/task")
    .then((res) =>  res.json())
    .then((data) => setResponseMessage(data));
  }, []);

  const createTask = async () => {
    const res = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name
      }),
    });
    const data = await res.json();
    setResponseMessage(data);
  };

  return (
    <div>
      <button className='hover:text-blue-500 my-5'>
                <Link href="/task">Back</Link>
            </button>
      <form onSubmit={createTask}>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
        <button className='hover:text-blue-500 my-5' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateTaskComponent;

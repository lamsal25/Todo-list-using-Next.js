"use client" // because useState is used on the client side

import React, { useState } from 'react'

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [maintask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...maintask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (i) => {
    let copyTask = [...maintask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const startEditing = (i, task) => {
    setIsEditing(i);
    setEditTitle(task.title);
    setEditDesc(task.desc);
  };

  const saveTask = (i) => {
    let copyTask = [...maintask];
    copyTask[i] = { title: editTitle, desc: editDesc };
    setMainTask(copyTask);
    setIsEditing(null);
    setEditTitle("");
    setEditDesc("");
  };

  let renderTask = <h2>No task available</h2>;

  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => {
      return (
        <li key={i} className='mb-4'>
          <div className='flex justify-between items-center'>
            {isEditing === i ? (
              <>
                <input
                  className='border-2 border-black p-2'
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className='border-2 border-black p-2'
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button onClick={() => saveTask(i)} className='border-2 border-black bg-green-600 text-white py-2 px-3 rounded-2xl'>Save</button>
              </>
            ) : (
              <>
                <h5 className='font-semibold text-2xl'>{t.title}</h5>
                <h6 className='font-semibold text-sm'>{t.desc}</h6>
                <button onClick={() => startEditing(i, t)} className='border-2 border-black bg-blue-600 text-white py-2 px-3 rounded-2xl'>Edit</button>
              </>
            )}
            <button onClick={() => deleteTask(i)} className='border-2 border-black bg-red-600 text-white py-2 px-3 rounded-2xl'>Delete</button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className='bg-black text-white text-center text-3xl font-bold'>My Todo List</h1>
      <form onSubmit={submitHandler}>
        <input
          className='border-2 border-black m-5 p-2'
          type="text"
          placeholder='Enter the title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='border-2 border-black m-5 p-2'
          type="text"
          placeholder='Enter the Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='border-2 border-black m-5 p-2 font-bold bg-black text-white rounded-full'>Add Task</button>
      </form>
      <hr className='border border-black' />
      <div className='p-5 bg-blue-100 mt-5'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  );
}

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
    e.preventDefault(); ///prevents default refresh of the page content
    setMainTask([...maintask, { title, desc, completed:false }]);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (i) => {
    let copyTask = [...maintask];  //making the copy if the main task
    copyTask.splice(i, 1);  ///i: The index of the task that you want to remove. // 1: The number of elements to remove, starting from index i.
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

 const toogleCompletion = (i)=>{
    let copyTask = [...maintask];
    copyTask[i].completed = !copyTask[i].completed;
    setMainTask(copyTask);

 }

  let renderTask = <h2>No task available</h2>;

  if (maintask.length > 0) {  //comparing if there is any task in the todo list or not
    renderTask = maintask.map((t, i) => {  //t: The current task object being processed. // i: The index of the current task.
      return (
        <li key={i} //The key prop is a unique identifier for each element in a list. React uses this key to track elements 
         className='mb-4'> 
          <div className='flex justify-between items-center'>
          <input type="checkbox" className=' w-5 h-5 '
          checked = {t.completed}
          onChange={()=>toogleCompletion(i)}
          />

            {isEditing === i ? (
              //code to edit the task
              <> 
               
                <input
                  className='border-2 border-black p-2 '
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                   
                <input
                  className='border-2 border-black p-2 '
                  type="text" 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                /> 
                <button onClick={() => saveTask(i)} className='border-2 border-black bg-green-600 text-white py-2 px-3 rounded-2xl'>Save</button>
              </>
            ) : (
              <>
                <h5 className={`font-semibold text-2xl ${t.completed ? 'line-through' : ''}`}>{t.title}</h5>
                <h6 className={`font-semibold text-sm ${t.completed ? 'line-through' : ''}`}>{t.desc}</h6>

                <button onClick={() => startEditing(i, t)} className='border-2 border-black bg-blue-600 text-white py-2 px-3 rounded-2xl'>Edit</button>
              </>
            )}
            
            <button onClick={() => deleteTask(i)} className='border-2 border-black bg-red-600 text-white py-2 px-3 rounded-2xl'>Delete</button>
          </div>
          <hr className='border-1 border-black mt-4'/>
        </li>
        
      );
    });
  }

  return (
    <>
    <div className=' w-2/3 m-auto mt-10 border  shadow-cyan-200'>
      <h1 className='bg-black text-white text-center text-3xl font-bold py-5'>My Todo List</h1>
      <form onSubmit={submitHandler}> 
        
        <input //used to read initial input from user
          className='border-2 border-black m-5 p-2 '
          type="text" required
          placeholder='Enter the title'
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='border-2 border-black m-5 p-2'
          type="text"
          placeholder='Enter the Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}  //e => event handler
        />
        <button className='border-2 border-black m-5 p-2 font-bold bg-black text-white rounded-full'>Add Task</button>
      </form>
      <hr className='border border-black' />
      <div className='p-5 bg-blue-100 mt-5'>
        <ul>
          {renderTask}
        </ul>
      </div>
      </div>
    </>
  );
}

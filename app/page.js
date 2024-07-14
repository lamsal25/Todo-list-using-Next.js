"use client"   ///because usestate is used in the cient side

import React, { useState } from 'react'

export default function page() {

  const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  const [maintask, setmaintask] = useState([]);

  const submithandler = (e) => {
    e.preventDefault()
    setmaintask([...maintask, { title, desc }])
    settitle("");
    setDesc("");
  }

  let rendertask = <h2>No task available</h2>

  const Deletetask = (i) => {
    let copytask = [...maintask]
    copytask.splice(i, 1)
    setmaintask(copytask)
  }


  if (maintask.length > 0) {
    rendertask = maintask.map((t, i) => {
      return (
        <li className=' mb-4'>
          <div className='flex justify-between items-center'>

            <h5 className=' font-semibold text-2xl'>{t.title}</h5>
            <h6 className=' font-semibold text-sm'>{t.desc}</h6>
            <button onClick={() => { Deletetask(i) }} className=' border-2 border-black bg-red-600 text-white py-2 px-3 rounded-2xl'>Delete</button>

          </div>
        </li>
      )
    });
  }

  return (
    <>

      <h1 className='bg-black text-white text-center text-3xl font-bold'   >My Todo List</h1>
      <form onSubmit={submithandler}>
        <input className=' border-2 border-black m-5 p-2'
          type="text"
          placeholder='Enter the title'
          value={title} //the title is dynamically updated by the users input
          onChange={(e) => {  //here e refers to event object
            //  console.log(e.target.value);
            settitle(e.target.value)
          }}
        />

        <input className=' border-2 border-black m-5 p-2'
          type="text"
          placeholder='Enter the Description'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value)
          }}
        />

        <button className=' border-2 border-black m-5 p-2 font-bold bg-black text-white rounded-full '>Add Task</button>

      </form>

      <hr className=' border border-black' />

      <div className=' p-5 bg-blue-100 mt-5  '>
        <ul>
          {rendertask}
        </ul>
      </div>



    </>
  )
}

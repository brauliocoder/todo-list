import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      text: task,
      completed: false,
    }

    setTasks([...tasks].concat(newTask));
    setTask("");
  }

  function deleteTask(id) {
    const updatedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleComplete(id) {
    const updatedTasks = [...tasks].map((task) => {
      if(task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  return (
    <div className='container mt-2'>
      <form onSubmit={handleSumbit}>
        <div className='row g-2'>
          <div className='col-auto'>
            <input className='form-control bg-light' type="text" onChange={(e) => setTask(e.target.value)} value={task} />
          </div>
          <div className='col-auto'>
            <button className='btn btn-primary' type="submit">Add</button>
          </div>
        </div>
      </form>
      {tasks.map((task) =>
        <div className='d-flex align-items-center d-grid gap-3 py-1'>
          <input className='form-check-input' type="checkbox" onChange={() => toggleComplete(task.id)} checked={task.completed} />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} key={task.id}>{task.text}</span> 
          <button className='btn-sm btn-dark' onClick={ () => deleteTask(task.id) }>Delete</button>
        </div>
      )}
    </div>
  );
}

export default App;

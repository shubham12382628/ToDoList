import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import deleteIcon  from './../assets/deleteIcon.png';

const TodoList = () => {
 const [list, setList] = useState([]);
 const [taskName, setTaskName] = useState('');

 const addTask = () => {
    setList((prev) => [...prev, {name: taskName, id: uuidv4(), done: false }]);
    setTaskName('');
 }

 const handleDelete = (task) => {
    const filterTask = list.filter((v) => v.id != task.id);
    setList(filterTask);
 }

 const handleDone = (task) => {
    setList((prevList) => 
      prevList.map((li) =>
        li.id === task.id ? { ...li, done: true } : li
      )
    );
  };

 return (
    <>
        <input type="text" placeholder="Enter your task" onChange={(e) => setTaskName(e.target.value) } value={taskName}/>
        <button onClick={addTask}>Add New Task</button>
        <h2>TO DO LIST</h2>
        <div style={{width: '600px', height: '300px', overflowY:"auto", border: '1px solid black'}}>
        {list.length > 0 && list.map((li) => {
            return (
                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 <p>{li.name}</p>
                 {li.done ? <input type="checkbox" style={{margin: '0px 10px'}} checked={true} /> : <input type="checkbox" style={{margin: '0px 10px'}} onClick={() => handleDone(li)} />}
                 <img src={deleteIcon}  style={{width: '20px', height: '20px'}} onClick={() => handleDelete(li)} />
                </div>
            )
        })}
        </div>
    </>
 )
}

export default TodoList;
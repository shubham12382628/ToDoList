import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import deleteIcon from './../assets/deleteIcon.png';
import './Todo.css';

const TodoList = () => {
   const [list, setList] = useState([]);
   const [taskName, setTaskName] = useState('');

   const addTask = () => {
      setList((prev) => [...prev, { name: taskName, id: uuidv4(), done: false }]);
      setTaskName('');
   }

   const handleDelete = (task) => {
      const filterTask = list.filter((v) => v.id != task.id);
      setList(filterTask);
   }

   const handleDone = (task) => {
      setList((prevList) =>
         prevList.map((li) =>
            li.id === task.id ? { ...li, done: !li.done } : li
         )
      );
   };

   const resetAll = () => {
      setList([]);
   }

   return (
      <>
         <div className="main-heading"><h2>TO DO LIST</h2></div>
         <div className="main-container">
            <input type="text" className="task-input" placeholder="Enter your task" onChange={(e) => setTaskName(e.target.value)} value={taskName} />
            <button className="task-btn" onClick={addTask}>Add New Task</button>
         </div>
         <div style={{ width: '600px', border: '1px solid black', marginTop: '20px' }}>
            <h3 className="sub-main-heading">List of Tasks</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr>
                     <th style={{ textAlign: 'left', padding: '10px 40px', borderBottom: '1px solid black' }}>Name</th>
                     <th style={{ textAlign: 'right', padding: '10px 40px', borderBottom: '1px solid black' }}>Actions</th>
                  </tr>
               </thead>
            </table>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                     {list.length > 0 && list.map((li) => (
                        <tr key={li.id} style={{ borderBottom: '1px solid #ddd' }}>
                           <td style={{ textAlign: 'left', padding: '10px 40px', textTransform: 'capitalize', textDecoration: li.done ? 'line-through' : 'none', }}>{li.name}</td>
                           <td style={{ textAlign: 'right', padding: '10px 40px' }}>
                              <input
                                 type="checkbox"
                                 style={{ marginRight: '20px', height: '20px', cursor: 'pointer', transform: 'scale(1.4)' }}
                                 checked={li.done}
                                 onChange={() => handleDone(li)}
                              />
                              <img
                                 src={deleteIcon}
                                 alt="Delete"
                                 style={{ width: '25px', height: '22px', cursor: 'pointer' }}
                                 onClick={() => handleDelete(li)}
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {list.length > 0 && <button className="task-reset-btn" onClick={resetAll}>Reset All</button>}
      </>
   )
}

export default TodoList;
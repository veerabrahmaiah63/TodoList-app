import React, { useState } from 'react'

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask ] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [priority, setPriority] = useState('medium');
    
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            const newTaskObj = {
                id: Date.now(),
                text: newTask,
                completed: false,
                priority: priority,
                dueDate: new Date().toLocaleDateString(),
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask('');
        }
    };
    const handleEditTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setNewTask(taskToEdit.text);
        setEditTaskId(id);
    };

    const handleSaveEdit = () => {
        const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: newTask } : task );
        setTasks(updatedTasks);
        setNewTask('');
        setEditTaskId(null);
    };
    const handleDeleteTask = (id) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    };

    const handleToggleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed } : task 
    );
    setTasks(updatedTasks);
    };
  return (
    <div>
      <h1>To-Do List</h1>
       <div>
         <input
             type="text"
             placeholder="Add a new task..."
             value={newTask}
             onChange={(e) => setNewTask(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {editTaskId ? (
                <button onClick={handleSaveEdit}>Save</button>
            ) : (
                <button onClick={handleAddTask}>Add Task</button>
            )}
       </div>

       <ul className="task-list">
           {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                             <span>{task.text}</span>
            <span>Priority: {task.priority}</span>
            <span>Due: {task.dueDate}</span>
            <div className="task-actions">
               <button onClick={() => handleEditTask(task.id)}>Edit</button>
               <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
               <button onClick={() => handleToggleComplete(task.id)}>
                 {task.completed ? 'Undo' : 'Complete'}
               </button>
            </div>

            </li>
           ))}
       </ul>
    </div>
  )
}

export default TodoList

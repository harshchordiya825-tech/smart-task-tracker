import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    } else {
      alert("Please enter a task!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header>
        <h1>Smart Task Tracker</h1>
        <p className="subtitle">Focus on your goals</p>
      </header>
      
      <div className="input-section">
        <input 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Enter a task..." 
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="stats">
        <span>Total Tasks: {tasks.length}</span>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span className="task-text">{t}</span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
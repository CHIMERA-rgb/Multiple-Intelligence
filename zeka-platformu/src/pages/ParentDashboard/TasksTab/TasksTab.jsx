import React from 'react';
import './TasksTab.css';

const TasksTab = () => {
  const tasks = [
    { id: 1, taskName: 'Matematik Ödevi', dueDate: '2024-12-10' },
    { id: 2, taskName: 'Okuma Görevi', dueDate: '2024-12-08' },
    { id: 3, taskName: 'Bilim Projesi', dueDate: '2024-12-15' },
  ];

  return (
    <div className="tasks-tab">
      <h2>Eksik Görevler</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.taskName}</strong> - Son Teslim Tarihi: {task.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksTab;

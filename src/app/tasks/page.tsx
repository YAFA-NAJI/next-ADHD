"use client"; 

import { getTasks, addTask } from '@/lib/tasks';
import { useState, useEffect } from 'react';

export default function TasksPage({ user }: { user: any }) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    async function loadTasks() {
      if (!user) return;
      const userTasks = await getTasks(user.id);
      setTasks(userTasks || []);
    }
    loadTasks();
  }, [user]);

  async function handleAdd() {
    if (!user) return;
    const newTask = { user_id: user.id, title: 'New Task', category: 'work', priority: 'high' };
    await addTask(newTask);
    const updatedTasks = await getTasks(user.id);
    setTasks(updatedTasks || []);
  }

  return (
    <div>
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
}

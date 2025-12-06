import { getTasks, addTask } from '@/lib/tasks';
import { useState, useEffect } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const userTasks = await getTasks(user.id);
      setTasks(userTasks || []);
    }
    loadTasks();
  }, []);

  async function handleAdd() {
    const newTask = { user_id: user.id, title: 'مهام جديدة', category: 'work', priority: 'high' };
    await addTask(newTask);
    setTasks(await getTasks(user.id));
  }

  return (
    <div>
      <button onClick={handleAdd}>أضف مهمة</button>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
}

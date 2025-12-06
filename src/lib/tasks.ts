import { supabase } from '@/utils/supabaseClient';

export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });
  if (error) console.error(error);
  return data;
}

export async function addTask(task: any) {
  const { data, error } = await supabase.from('tasks').insert([task]);
  if (error) console.error(error);
  return data;
}

export async function updateTask(taskId: string, updates: any) {
  const { data, error } = await supabase.from('tasks').update(updates).eq('id', taskId);
  if (error) console.error(error);
  return data;
}

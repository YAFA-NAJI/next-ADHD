import { supabase } from '@/utils/supabaseClient';

export async function saveScreeningResult(userId: string, answers: any[], score: number, interpretation: string, forGroup: string) {
  const { data, error } = await supabase
    .from('screenings')
    .insert([{
      user_id: userId,
      for_group: forGroup,
      score,
      interpretation,
      raw_answers: answers
    }]);
  
  if (error) console.error(error);
  return data;
}

import { saveScreeningResult } from '@/lib/screening';
import { useSupabaseAuth } from '@/contexts/AuthContext'; // إذا عندك AuthContext

async function handleSubmit(answers: any[]) {
  const score = calculateScore(answers); // احسبي مجموع النقاط
  const interpretation = interpretScore(score); // نص التفسير

  await saveScreeningResult(user.id, answers, score, interpretation, 'adult');
  alert('تم حفظ نتيجتك!');
}

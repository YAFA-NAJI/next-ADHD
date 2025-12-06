import { supabase } from "@/utils/supabaseClient";
import HomeClient from "@/components/HomeClient"; // 1. استيراد المكون الجديد

// --- دوال جلب البيانات (تبقى على الخادم) ---

async function getDailyMessage() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const { data, error } = await supabase
      .from("daily_messages")
      .select("message")
      .eq("date", today)
      .single();

    // PGRST116 يعني "لم يتم العثور على صف"، وهو أمر متوقع إذا لم تكن هناك رسالة لليوم
    if (error && error.code !== "PGRST116") {
      console.error("Supabase error (getDailyMessage):", error.message);
    }

    return data?.message || "Your unique mind is your greatest asset. Embrace the journey, one step at a time.";
  } catch (err) {
    console.error("Unexpected error (getDailyMessage):", err);
    return "Your unique mind is your greatest asset. Embrace the journey, one step at a time.";
  }
}

async function getLatestContent() {
  try {
    // جلب المقالات والبودكاست في نفس الوقت لتحسين الأداء
    const [articlesResult, podcastsResult] = await Promise.all([
      supabase
        .from("articles")
        .select("id, title, slug, author_id, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("podcasts")
        .select("id, title, host_id, created_at")
        .order("created_at", { ascending: false })
        .limit(3)
    ]);

    if (articlesResult.error) console.error("Articles error:", articlesResult.error.message);
    if (podcastsResult.error) console.error("Podcasts error:", podcastsResult.error.message);

    const articlesMapped = (articlesResult.data || []).map(a => ({
      id: a.id,
      title: a.title,
      author: a.author_id, // ملاحظة: هذا هو المعرف وليس الاسم
      type: "Article",
      link: `/articles/${a.slug}`,
      created_at: a.created_at
    }));

    const podcastsMapped = (podcastsResult.data || []).map(p => ({
      id: p.id,
      title: p.title,
      author: p.host_id, // ملاحظة: هذا هو المعرف وليس الاسم
      type: "Podcast",
      link: `/podcasts/${p.id}`,
      created_at: p.created_at
    }));

    // دمج وترتيب المحتوى حسب تاريخ الإنشاء
    return [...articlesMapped, ...podcastsMapped].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  } catch (err) {
    console.error("Unexpected error (getLatestContent):", err);
    return [];
  }
}

async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Testimonials error:", error.message);
    }
    return data || [];
  } catch (err) {
    console.error("Unexpected error (getTestimonials):", err);
    return [];
  }
}

// --- مكون الخادم الرئيسي (الصفحة) ---

export default async function Home() {
  // 2. جلب كل البيانات على الخادم بشكل متوازٍ
  const [dailyPositiveMessage, latestContent, testimonials] = await Promise.all([
    getDailyMessage(),
    getLatestContent(),
    getTestimonials()
  ]);

  // 3. تمرير البيانات كم props إلى مكون العميل الذي سيعرضها
  return (
    <HomeClient
      dailyPositiveMessage={dailyPositiveMessage}
      latestContent={latestContent}
      testimonials={testimonials}
    />
  );
}

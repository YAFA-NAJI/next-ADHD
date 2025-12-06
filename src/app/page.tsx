import { supabase } from "@/utils/supabaseClient";
import HomeClient from "@/components/HomeClient"; 


async function getLatestContent() {
  try {
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
      author: a.author_id,
      type: "Article",
      link: `/articles/${a.slug}`,
      created_at: a.created_at
    }));

    const podcastsMapped = (podcastsResult.data || []).map(p => ({
      id: p.id,
      title: p.title,
      author: p.host_id,
      type: "Podcast",
      link: `/podcasts/${p.id}`,
      created_at: p.created_at
    }));

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

    if (error) console.error("Testimonials error:", error.message);
    return data || [];
  } catch (err) {
    console.error("Unexpected error (getTestimonials):", err);
    return [];
  }
}


export default function Home() {
  return <HomeClient />;
}
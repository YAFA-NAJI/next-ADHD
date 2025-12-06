"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Edit2, Save, X, Upload } from "lucide-react";

interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  locale: string | null;
  timezone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) console.error(error.message);

    if (!data) {
      setProfile({
        id: user.id,
        display_name: "",
        avatar_url: null,
        bio: "",
        locale: "",
        timezone: "",
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setFormData({});
    } else {
      setProfile(data);
      setFormData(data);
    }

    setLoading(false);
  }

  // ========== رفع الصورة ==========
  async function handleAvatarChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = fileName;

    // رفع الصورة
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return;
    }

    // إحضار الرابط العام
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // حفظ الرابط في جدول profiles
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (dbError) console.error(dbError.message);
    else setFormData({ ...formData, avatar_url: publicUrl });
  }

  async function handleSave() {
    if (!profile) return;

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error(error.message);
      return;
    }

    setProfile(data);
    setEditing(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-dark">
        Your Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">

        {/* صورة المستخدم */}
        <div className="relative w-32 h-32">
          {/* تم استبدال Image بـ img */}
          <img
            src={formData.avatar_url || "/images/default-avatar.jpg"}
            alt={profile?.display_name || "User"}
            className="w-32 h-32 rounded-full object-cover border-2 border-primary dark:border-primary-dark"
          />

          {editing && (
            <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer">
              <Upload size={20} className="text-white" />
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>

        {/* بيانات المستخدم */}
        <div className="flex-1">
          {editing ? (
            <>
              <input
                type="text"
                className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Display Name"
                value={formData.display_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, display_name: e.target.value })
                }
              />

              <textarea
                className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Bio"
                value={formData.bio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <input
                type="text"
                className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Locale"
                value={formData.locale || ""}
                onChange={(e) =>
                  setFormData({ ...formData, locale: e.target.value })
                }
              />

              <input
                type="text"
                className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Timezone"
                value={formData.timezone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
              />

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                >
                  <Save size={16} /> Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile?.display_name || "Your Name"}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {profile?.bio || "No bio yet."}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Locale: {profile?.locale || "-"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Timezone: {profile?.timezone || "-"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Role: {profile?.role}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

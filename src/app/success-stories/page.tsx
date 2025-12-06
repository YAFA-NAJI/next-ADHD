'use client';

import { useState, useMemo } from 'react'; // استيراد useMemo
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, TrendingUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// تم تحديث الواجهة لتستخدم مفاتيح الترجمة
interface SuccessStory {
  id: number;
  name: string;
  age: number;
  storyKey: string; // مفتاح لترجمة القصة
  improvementKey: string; // مفتاح لترجمة التحسن
  image: string;
  category: 'focus' | 'emotion' | 'social' | 'academic';
  rating: number;
  date: string;
}

export default function SuccessStoriesPage() {
  const { t, dir, language } = useLanguage();

  // الحالة الآن تحتوي على مفاتيح الترجمة بدلاً من النصوص المترجمة
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([
    {
      id: 1,
      name: 'Mohammed',
      age: 16,
      storyKey: "successStories.sample1.story",
      improvementKey: "successStories.sample1.improvement",
      image: '🎓',
      category: 'focus',
      rating: 5,
      date: '2024-11-15'
    },
    {
      id: 2,
      name: 'Fatima',
      age: 14,
      storyKey: "successStories.sample2.story",
      improvementKey: "successStories.sample2.improvement",
      image: '😊',
      category: 'emotion',
      rating: 5,
      date: '2024-11-10'
    },
    {
      id: 3,
      name: 'Ali',
      age: 15,
      storyKey: "successStories.sample3.story",
      improvementKey: "successStories.sample3.improvement",
      image: '👥',
      category: 'social',
      rating: 5,
      date: '2024-11-05'
    }
  ]);

  // استخدام useMemo لتحسين الأداء وتجنب إعادة حساب التصنيفات مع كل عرض
  const categoryLabels = useMemo(() => ({
    focus: t("successStories.categories.focus"),
    emotion: t("successStories.categories.emotion"),
    social: t("successStories.categories.social"),
    academic: t("successStories.categories.academic")
  }), [t]);

  const categoryColors = {
    focus: 'from-blue-50 to-blue-100 border-blue-200',
    emotion: 'from-purple-50 to-purple-100 border-purple-200',
    social: 'from-green-50 to-green-100 border-green-200',
    academic: 'from-amber-50 to-amber-100 border-amber-200'
  };

  const categoryBadgeColors = {
    focus: 'bg-blue-100 text-blue-700',
    emotion: 'bg-purple-100 text-purple-700',
    social: 'bg-green-100 text-green-700',
    academic: 'bg-amber-100 text-amber-700'
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    story: '',
    improvement: '',
    category: 'focus'
  });

  const filteredStories = selectedCategory
    ? successStories.filter((story) => story.category === selectedCategory)
    : successStories;

  const toggleLike = (id: number) => {
    const newLiked = new Set(liked);
    newLiked.has(id) ? newLiked.delete(id) : newLiked.add(id);
    setLiked(newLiked);
  };

  // تم تحديث هذه الدالة لتتوافق مع القصص التي يضيفها المستخدم (لا تستخدم مفاتيح ترجمة)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStory: SuccessStory = {
      id: successStories.length + 1,
      name: formData.name,
      age: Number(formData.age),
      storyKey: formData.story, // النص المدخل مباشرة
      improvementKey: formData.improvement, // النص المدخل مباشرة
      image: '📝',
      category: formData.category as SuccessStory["category"],
      rating: 5,
      date: new Date().toISOString()
    };

    setSuccessStories([newStory, ...successStories]);

    setFormData({
      name: '',
      age: '',
      story: '',
      improvement: '',
      category: 'focus'
    });

    setShowForm(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      dir={dir}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
          {t("successStories.title")}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t("successStories.subtitle")}
        </p>
      </motion.div>

      {/* Filter */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto">
        <p className="text-sm text-slate-600 mb-4 font-medium">
          {t("successStories.filterLabel")}
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-slate-800 text-white shadow-lg'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-400'
            }`}
          >
            {t("successStories.all")}
          </motion.button>

          {Object.entries(categoryLabels).map(([key, label]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? `${categoryBadgeColors[key as keyof typeof categoryBadgeColors]} shadow-lg`
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-400'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 mb-6"
        >
          {t("successStories.shareButton")}
        </motion.button>
      </div>

      {/* Stories Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${categoryColors[story.category]} border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
                onClick={() =>
                  setExpandedStory(expandedStory === story.id ? null : story.id)
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{story.image}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {story.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {story.age} {t("successStories.yearsOld")}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(story.id);
                    }}
                    className="focus:outline-none"
                  >
                    <Heart
                      size={24}
                      className={`transition-all duration-300 ${
                        liked.has(story.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-slate-400 hover:text-red-400'
                      }`}
                    />
                  </motion.button>
                </div>

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryBadgeColors[story.category]
                    }`}
                  >
                    {categoryLabels[story.category]}
                  </span>
                </div>

                {/* تم التعديل: استخدام دالة الترجمة t() هنا */}
                <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(story.storyKey)}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white bg-opacity-60 rounded-lg p-3 mb-4 flex items-center gap-2"
                >
                  <TrendingUp size={18} className="text-green-600 flex-shrink-0" />
                  {/* تم التعديل: استخدام دالة الترجمة t() هنا */}
                  <p className="text-sm font-semibold text-green-700">
                    {t(story.improvementKey)}
                  </p>
                </motion.div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-lg font-semibold text-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  {expandedStory === story.id
                    ? t("successStories.hideFull")
                    : t("successStories.readFull")}
                </motion.button>

                <AnimatePresence>
                  {expandedStory === story.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t-2 border-white border-opacity-40"
                    >
                      {/* تم التعديل: استخدام دالة الترجمة t() هنا */}
                      <p className="text-slate-700 leading-relaxed mb-3">
                        {t(story.storyKey)}
                      </p>
                      <p className="text-xs text-slate-600">
                        {t("successStories.date")}:{" "}
                        {/* تم إصلاح التاريخ بشكل نهائي */}
                        {new Date(story.date).toLocaleDateString(
                          language === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', 
                          { year: 'numeric', month: 'numeric', day: 'numeric' }
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              dir={dir} // إضافة اتجاه النص للمودال أيضاً
            >
              <h2 className="text-xl font-bold mb-4">
                {t("successStories.formTitle")}
              </h2>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder={t("successStories.form.name")}
                  value={formData.name}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />

                <input
                  type="number"
                  placeholder={t("successStories.form.age")}
                  value={formData.age}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />

                <textarea
                  placeholder={t("successStories.form.story")}
                  value={formData.story}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={4}
                />

                <input
                  type="text"
                  placeholder={t("successStories.form.improvement")}
                  value={formData.improvement}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, improvement: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>

                <div className="flex justify-between mt-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:shadow-lg transition"
                  >
                    {t("successStories.form.submit")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-red-500 px-4 py-2 rounded"
                  >
                    {t("successStories.form.cancel")}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

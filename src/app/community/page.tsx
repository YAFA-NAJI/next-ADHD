'use client';

import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Calendar, Clock, MapPin } from 'lucide-react';
import { Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// مفاتيح الأحداث
const COMMUNITY_EVENTS_KEYS = [
  'community.events.supportGroupMeeting',
  'community.events.mindfulnessWorkshop',
  'community.events.parentCoachWebinar'
];

// المشاركات الأولية
const INITIAL_POSTS = [
  {
    id: 1,
    authorKey: 'community.authors.sarah',
    roleKey: 'community.roles.coach',
    titleKey: 'community.posts.tipsMorning.title',
    contentKey: 'community.posts.tipsMorning.content',
    categoryKey: 'community.categories.tips',
    likes: 342,
    comments: [
      { 
        id: 1, 
        userKey: 'community.commenters.alice', 
        textKey: 'community.comments.tipsMorning.alice', 
        replies: [
          { id: 1, userKey: 'community.commenters.sarah', textKey: 'community.comments.tipsMorning.sarahReply' }
        ] 
      },
      { 
        id: 2, 
        userKey: 'community.commenters.bob', 
        textKey: 'community.comments.tipsMorning.bob', 
        replies: [] 
      },
    ],
    views: 1200,
  },
  {
    id: 2,
    authorKey: 'community.authors.ahmad',
    roleKey: 'community.roles.member',
    titleKey: 'community.posts.feelingOverwhelmed.title',
    contentKey: 'community.posts.feelingOverwhelmed.content',
    categoryKey: 'community.categories.support',
    likes: 156,
    comments: [
      { id: 1, userKey: 'community.commenters.emma', textKey: 'community.comments.feelingOverwhelmed.emma', replies: [] },
      { id: 2, userKey: 'community.authors.sarah', textKey: 'community.comments.feelingOverwhelmed.sarah', replies: [] },
    ],
    views: 890,
  },
];

// مكوّن إدخال الردود
const ReplyInput = ({ onReply, placeholder }: { onReply: (text: string) => void, placeholder: string }) => {
  const [reply, setReply] = useState('');
  return (
    <div className="flex gap-2 mt-1 ml-6">
      <input
        type="text"
        placeholder={placeholder}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="flex-1 p-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => { onReply(reply); setReply(''); }}
        className="px-2 py-1 bg-blue-400 text-white rounded-full text-xs hover:bg-blue-500 transition-colors"
      >
        Reply
      </button>
    </div>
  );
};

// مكوّن بطاقة المشاركة
const PostCard = ({
  post,
  updatePost,
  deletePost,
  t
}: {
  post: typeof INITIAL_POSTS[0],
  updatePost: (updatedPost: typeof INITIAL_POSTS[0]) => void,
  deletePost: (id: number) => void,
  t: (key: string) => string
}) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(t(post.titleKey));
  const [editedContent, setEditedContent] = useState(t(post.contentKey));

  const addComment = () => {
    if (!newComment.trim()) return;
    const id = comments.length ? comments[comments.length - 1].id + 1 : 1;
    const updatedComments = [...comments, { id, user: 'You', text: newComment, replies: [] }];
    setComments(updatedComments);
    updatePost({ ...post, comments: updatedComments });
    setNewComment('');
  };

  const addReply = (commentId: number, replyText: string) => {
    if (!replyText.trim()) return;
    const updatedComments = comments.map(c => {
      if (c.id === commentId) {
        const newReplyId = c.replies.length ? c.replies[c.replies.length - 1].id + 1 : 1;
        return { ...c, replies: [...c.replies, { id: newReplyId, user: 'You', text: replyText }] };
      }
      return c;
    });
    setComments(updatedComments);
    updatePost({ ...post, comments: updatedComments });
  };

  const saveEdit = () => {
    updatePost({ ...post, titleKey: editedTitle, contentKey: editedContent });
    setEditing(false);
  };

  const isOwner = post.authorKey === 'community.authors.you';

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-900">{t(post.authorKey)}</h3>
        <span className="text-sm text-gray-500">{t(post.categoryKey)}</span>
      </div>

      {editing ? (
        <div className="space-y-2">
          <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="w-full border p-1 rounded" />
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="w-full border p-1 rounded" />
          <div className="flex gap-2">
            <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button onClick={() => setEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-900">{t(post.titleKey)}</h2>
          <p className="text-gray-700 text-sm">{t(post.contentKey)}</p>
        </>
      )}

      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <button onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }} className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}>
          <Heart size={16} /> {likes}
        </button>
        <div className="flex items-center gap-1"><MessageCircle size={16} /> {comments.length}</div>
        <div className="flex items-center gap-1"><Users size={16} /> {post.views}</div>
        {isOwner && !editing && (
          <div className="flex gap-2 ml-auto">
            <button onClick={() => setEditing(true)} className="text-yellow-500 hover:text-yellow-700">
              <Edit2 size={18} />
            </button>
            <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Comments */}
      <div className="mt-3 border-t pt-3 space-y-2">
     {comments.map(c => (
  <div key={c.id} className="space-y-1">
    <div className="text-gray-700 text-sm">
      <span className="font-semibold">{c.userKey ? t(c.userKey) : c.user}:</span> {c.textKey ? t(c.textKey) : c.text}
    </div>
    {c.replies.map(r => (
      <div key={r.id} className="ml-6 text-gray-600 text-sm flex items-center justify-between">
        <span>
          <span className="font-semibold">{r.userKey ? t(r.userKey) : r.user}:</span> {r.textKey ? t(r.textKey) : r.text}
        </span>
      </div>
    ))}
    <ReplyInput onReply={(text) => addReply(c.id, text)} placeholder={t('community.reply')} />
  </div>
))}


        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder={t('community.addComment')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <button onClick={addComment} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors">
            {t('community.post')}
          </button>
        </div>
      </div>
    </div>
  );
};

// مكوّن بطاقة الحدث
const EventCard = ({ event, t }: { event: { titleKey: string, date: string, time: string, location: string }, t: (key: string) => string }) => {
  const [joined, setJoined] = useState(false);
  const eventObj = t(event.titleKey, { returnObjects: true }) as { title: string; date: string; time: string; location: string; join: string; joined: string };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 hover:shadow-lg transition-all duration-300">
      <h4 className="font-semibold">{eventObj.title}</h4>
      <div className="flex items-center gap-2 text-gray-700"><Calendar size={16} /> {eventObj.date}</div>
      <div className="flex items-center gap-2 text-gray-700"><Clock size={16} /> {eventObj.time}</div>
      <div className="flex items-center gap-2 text-gray-700"><MapPin size={16} /> {eventObj.location}</div>
      <button
        onClick={() => setJoined(true)}
        disabled={joined}
        className={`mt-2 px-3 py-1 rounded ${joined ? 'bg-gray-400 text-white cursor-default' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        {joined ? eventObj.joined : eventObj.join}
      </button>
    </div>
  );
};

// الصفحة الرئيسية للمجتمع
export default function CommunityPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'tips' | 'support'>('all');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('community.categories.tips');

  const filteredPosts = activeTab === 'all'
    ? posts
    : posts.filter(p => activeTab === 'tips' ? p.categoryKey === 'community.categories.tips' : p.categoryKey === 'community.categories.support');

  const addPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    setPosts([{
      id,
      authorKey: 'community.authors.you',
      roleKey: 'community.roles.member',
      titleKey: newPostTitle,
      contentKey: newPostContent,
      categoryKey: newPostCategory,
      likes: 0,
      comments: [],
      views: 0
    }, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('community.categories.tips');
  };

  const updatePost = (updatedPost: typeof INITIAL_POSTS[0]) => setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  const deletePost = (id: number) => setPosts(posts.filter(p => p.id !== id));

  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('/images/community-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-blue-50/80 min-h-screen px-4 py-8">
        {/* Header */}
        <section className="text-center mb-8 py-8 px-4 rounded-xl bg-blue-200/40">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{t('community.headerTitle')}</h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700">{t('community.headerSubtitle')}</p>
        </section>

        {/* New Post */}
        <section className="max-w-5xl mx-auto mb-8 space-y-2">
          <input type="text" placeholder={t('community.newPostTitle')} value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder={t('community.newPostContent')} value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <select value={newPostCategory} onChange={(e) => setNewPostCategory(e.target.value)} className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="community.categories.tips">{t('community.categoryTips')}</option>
            <option value="community.categories.support">{t('community.categorySupport')}</option>
          </select>
          <button onClick={addPost} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">{t('community.post')}</button>
        </section>

        {/* Tabs */}
        <section className="max-w-5xl mx-auto flex justify-start gap-2 mb-4 p-2 rounded-xl bg-blue-100 shadow-sm">
          <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-full ${activeTab==='all'?'bg-blue-500 text-white':'bg-blue-200 text-blue-800'}`}>{t('community.tabAll')}</button>
          <button onClick={() => setActiveTab('tips')} className={`px-4 py-2 rounded-full ${activeTab==='tips'?'bg-blue-500 text-white':'bg-blue-200 text-blue-800'}`}>{t('community.tabTips')}</button>
          <button onClick={() => setActiveTab('support')} className={`px-4 py-2 rounded-full ${activeTab==='support'?'bg-blue-500 text-white':'bg-blue-200 text-blue-800'}`}>{t('community.tabSupport')}</button>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="md:col-span-2 space-y-4">
            {filteredPosts.map(post => <PostCard key={post.id} post={post} updatePost={updatePost} deletePost={deletePost} t={t} />)}
          </div>

          {/* Sidebar: Events */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg mb-2">{t('community.upcomingEvents')}</h3>
            {COMMUNITY_EVENTS_KEYS.map(key => <EventCard key={key} event={{ titleKey: key, date: '', time: '', location: '' }} t={t} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

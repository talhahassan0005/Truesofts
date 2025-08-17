'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  content: '',
  image: '',
  fontFamily: 'Manrope sans-serif',
  textColor: '#000000',
  backgroundColor: '#FFFFFF',
  authorName: '',
  authorRole: '',
  authorAvatar: ''
};

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('add');
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/Login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/Login');
  };

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchBlogs();
    }
  }, [loading]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'add') fetchBlogs();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add blog');
      alert('✅ Blog Added');
      setForm(emptyForm);
      fetchBlogs();
    } catch (err) {
      
      console.error('Error details:', err);
      alert('❌ Failed to add blog');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/blogs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      alert('🗑 Blog Deleted');
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete blog');
    }
  };

  const handleEditLoad = (blog) => {
    setForm({
      title: blog.title || '',
      description: blog.description || '',
      category: blog.category || '',
      content: blog.content || '',
      image: blog.image || '',
      fontFamily: blog.fontFamily || 'Manrope sans-serif',
      textColor: blog.textColor || '#000000',
      backgroundColor: blog.backgroundColor || '#FFFFFF',
      authorName: blog.author?.name || '',
      authorRole: blog.author?.role || '',
      authorAvatar: blog.author?.avatar || ''
    });
    setEditId(blog._id);
    setActiveTab('add');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/blogs/${editId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Update failed');
      alert('✏ Blog Updated');
      setEditId(null);
      setForm(emptyForm);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-transparent-700 text-black font-bold p-6 space-y-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button 
          onClick={() => handleTabChange('add')} 
          className="block w-full shadow text-left hover:bg-blue-700 hover:text-white p-2 rounded"
        >
          Add Blog
        </button>
        <button 
          onClick={() => handleTabChange('update')} 
          className="block w-full shadow text-left hover:bg-blue-700 hover:text-white p-2 rounded"
        >
          Update Blog
        </button>
        <button 
          onClick={() => handleTabChange('delete')} 
          className="block w-full shadow text-left hover:bg-blue-700 hover:text-white p-2 rounded"
        >
          Delete Blog
        </button>
        <button 
          onClick={handleLogout}
          className="block w-full shadow text-left hover:bg-red-700 hover:text-white p-2 rounded mt-8"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {activeTab === 'add' && (
          <form onSubmit={editId ? handleUpdate : handleAdd} className="space-y-4 bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold">{editId ? 'Update Blog' : 'Add New Blog'}</h1>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full shadow p-2" required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full shadow p-2" required />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full shadow p-2" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full shadow p-2" />

            <MdEditor
              style={{ height: '300px' }}
              value={form.content}
              renderHTML={(text) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
              onChange={({ text }) => setForm((prev) => ({ ...prev, content: text }))}
            />

            <div className="grid grid-cols-3 gap-4">
              <select name="fontFamily" value={form.fontFamily} onChange={handleChange} className="border p-2">
                <option value="sans-serif">Sans Serif</option>
                <option value="inter">Inter</option>
                <option value="monrope">Monrope</option>
              </select>
              <input type="color" name="textColor" value={form.textColor} onChange={handleChange} />
              <input type="color" name="backgroundColor" value={form.backgroundColor} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input name="authorName" placeholder="Author Name" value={form.authorName} onChange={handleChange} className="border p-2" />
              <input name="authorRole" placeholder="Author Role" value={form.authorRole} onChange={handleChange} className="border p-2" />
              <input name="authorAvatar" placeholder="Author Avatar URL" value={form.authorAvatar} onChange={handleChange} className="border p-2" />
            </div>

            <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-900">
              {editId ? 'Update Blog' : 'Publish Blog'}
            </button>
          </form>
        )}

        {activeTab === 'update' && (
          <div>
            <h1 className="text-xl font-bold mb-4">Select a Blog to Edit</h1>
            <ul className="space-y-2">
              {blogs.map((blog) => (
                <li key={blog._id} className="bg-white p-4 rounded shadow flex justify-between">
                  <span>{blog.title}</span>
                  <button onClick={() => handleEditLoad(blog)} className="px-4 py-1 bg-blue-500 text-white rounded">Edit</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'delete' && (
          <div>
            <h1 className="text-xl font-bold mb-4">Select a Blog to Delete</h1>
            <ul className="space-y-2">
              {blogs.map((blog) => (
                <li key={blog._id} className="bg-white p-4 rounded shadow flex justify-between">
                  <span>{blog.title}</span>
                  <button onClick={() => handleDelete(blog._id)} className="px-4 py-1 bg-red-500 text-white rounded">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, Plus, Search, Image as ImageIcon, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['ALL', 'BEACHES', 'CITIES', 'NATURE', 'ADVENTURE', 'CULTURE', 'FOOD'];

const initialImages = [
  { id: '1', title: 'Bali Rice Terraces', category: 'NATURE', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', active: true },
  { id: '2', title: 'Santorini Blue Domes', category: 'CITIES', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400', active: true },
  { id: '3', title: 'Maldives Overwater', category: 'BEACHES', url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400', active: true },
  { id: '4', title: 'Kenya Safari', category: 'ADVENTURE', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', active: true },
  { id: '5', title: 'Tokyo Night Lights', category: 'CITIES', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', active: true },
  { id: '6', title: 'Patagonia Mountains', category: 'NATURE', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400', active: false },
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState(initialImages);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('NATURE');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = images.filter((img) => {
    const matchSearch = !search || img.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'ALL' || img.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this image?')) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success('Image deleted');
    }
  };

  const toggleActive = (id: string) => {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, active: !img.active } : img));
    toast.success('Image visibility updated');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get presigned URL from API
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const { uploadUrl, publicUrl } = await res.json();

      // Upload to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      // Add to gallery
      const newImg = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^.]+$/, ''),
        category: 'NATURE',
        url: publicUrl,
        active: true,
      };
      setImages((prev) => [newImg, ...prev]);
      toast.success('Image uploaded successfully!');
    } catch {
      toast.error('Upload failed. Please try again or use URL method.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddByUrl = () => {
    if (!newImageUrl || !newImageTitle) {
      toast.error('Please fill in all fields');
      return;
    }
    const newImg = {
      id: Date.now().toString(),
      title: newImageTitle,
      category: newImageCategory,
      url: newImageUrl,
      active: true,
    };
    setImages((prev) => [newImg, ...prev]);
    setShowAddModal(false);
    setNewImageUrl('');
    setNewImageTitle('');
    toast.success('Image added to gallery!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gallery</h1>
          <p className="text-gray-500 mt-1">Manage your travel photo gallery</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add by URL
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary py-2.5 px-5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-70"
          >
            {uploading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {uploading ? 'Uploading...' : 'Upload to S3'}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-black text-gray-900">{images.length}</p>
          <p className="text-sm text-gray-500">Total Images</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-black text-green-600">{images.filter(i => i.active).length}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-black text-gray-400">{images.filter(i => !i.active).length}</p>
          <p className="text-sm text-gray-500">Hidden</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="form-input pl-9 h-10 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-auto">{filtered.length} images</span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className={`relative group rounded-xl overflow-hidden shadow-sm border-2 transition-all duration-200 ${img.active ? 'border-transparent' : 'border-gray-200 opacity-60'}`}>
            <img src={img.url} alt={img.title} className="w-full h-36 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                <button
                  onClick={() => toggleActive(img.id)}
                  className={`p-2 rounded-full ${img.active ? 'bg-yellow-400 text-white' : 'bg-green-400 text-white'} hover:scale-110 transition-transform`}
                  title={img.active ? 'Hide' : 'Show'}
                >
                  {img.active ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-2 bg-white">
              <p className="text-xs font-medium text-gray-900 truncate">{img.title}</p>
              <span className="text-xs text-blue-600">{img.category.charAt(0) + img.category.slice(1).toLowerCase()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add by URL Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">Add Image by URL</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image Title</label>
                <input
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="e.g., Bali Sunset"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select value={newImageCategory} onChange={(e) => setNewImageCategory(e.target.value)} className="form-input">
                  {categories.filter(c => c !== 'ALL').map((c) => (
                    <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>
              {newImageUrl && (
                <div className="rounded-xl overflow-hidden h-32">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+URL'; }} />
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={handleAddByUrl} className="btn-primary flex-1 justify-center py-3 rounded-xl">
                  Add Image
                </button>
                <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 justify-center py-3 rounded-xl">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

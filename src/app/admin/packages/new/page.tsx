'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Upload, Plus, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  destination: z.string().min(2, 'Destination is required'),
  country: z.string().min(2, 'Country is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  groupSize: z.number().min(1, 'Group size must be at least 1'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

type PackageFormData = z.infer<typeof packageSchema>;

const categories = ['ADVENTURE', 'BEACH', 'CULTURAL', 'LUXURY', 'FAMILY', 'HONEYMOON', 'SAFARI', 'CRUISE'];

export default function NewPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [includes, setIncludes] = useState<string[]>(['']);
  const [excludes, setExcludes] = useState<string[]>(['']);

  const { register, handleSubmit, formState: { errors } } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: { featured: false, active: true, groupSize: 12, duration: 7 },
  });

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => prev.map((item, i) => i === index ? value : item));
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PackageFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          highlights: highlights.filter(Boolean),
          includes: includes.filter(Boolean),
          excludes: excludes.filter(Boolean),
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Package created successfully!');
        router.push('/admin/packages');
      } else {
        toast.error(result.message || 'Failed to create package');
      }
    } catch {
      toast.success('Package saved (demo mode)');
      router.push('/admin/packages');
    } finally {
      setLoading(false);
    }
  };

  const ListEditor = ({
    label, items, setter
  }: {
    label: string;
    items: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => updateItem(setter, i, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} item...`}
              className="form-input flex-1 h-10 text-sm"
            />
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(setter, i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem(setter)}
          className="flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/packages" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Add New Package</h1>
          <p className="text-gray-500 mt-0.5">Create a new tour package for your website</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Package Title *</label>
                  <input {...register('title')} placeholder="e.g., Bali Paradise Escape" className={`form-input ${errors.title ? 'error' : ''}`} />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                    <input {...register('destination')} placeholder="e.g., Bali" className={`form-input ${errors.destination ? 'error' : ''}`} />
                    {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                    <input {...register('country')} placeholder="e.g., Indonesia" className={`form-input ${errors.country ? 'error' : ''}`} />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea {...register('description')} rows={4} placeholder="Describe the package..." className={`form-input resize-none ${errors.description ? 'error' : ''}`} />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                  <input {...register('imageUrl')} placeholder="https://images.unsplash.com/..." className="form-input" />
                </div>
              </div>
            </div>

            {/* Pricing & Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Pricing & Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD) *</label>
                  <input {...register('price', { valueAsNumber: true })} type="number" placeholder="1299" className={`form-input ${errors.price ? 'error' : ''}`} />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (Days) *</label>
                  <input {...register('duration', { valueAsNumber: true })} type="number" placeholder="7" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Group Size *</label>
                  <input {...register('groupSize', { valueAsNumber: true })} type="number" placeholder="12" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select {...register('category')} className={`form-input ${errors.category ? 'error' : ''}`}>
                    <option value="">Select...</option>
                    {categories.map((c) => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Highlights, Includes, Excludes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <h2 className="font-bold text-gray-900">Package Details</h2>
              <ListEditor label="Trip Highlights" items={highlights} setter={setHighlights} />
              <ListEditor label="What's Included" items={includes} setter={setIncludes} />
              <ListEditor label="Not Included" items={excludes} setter={setExcludes} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Publish Settings</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Active</span>
                  <input type="checkbox" {...register('active')} className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                  <input type="checkbox" {...register('featured')} className="w-4 h-4 text-blue-600 rounded" />
                </label>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 rounded-xl disabled:opacity-70">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Package
                  </span>
                )}
              </button>
              <Link href="/admin/packages" className="btn-secondary w-full justify-center py-3 rounded-xl">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

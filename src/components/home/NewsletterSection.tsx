'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="section-title mb-4">
            Get Exclusive Travel Deals
          </h2>
          <p className="section-subtitle mb-8">
            Subscribe to our newsletter and receive handpicked travel deals, destination guides, and travel inspiration directly in your inbox. Join 50,000+ travel enthusiasts!
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-green-700 font-semibold">
                You&apos;re subscribed! Welcome to the Hamdi&apos;s Travel family.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="form-input pl-12 h-14 text-base"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary h-14 px-8 rounded-xl text-base whitespace-nowrap disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Subscribe
                  </span>
                )}
              </button>
            </form>
          )}

          <p className="text-gray-400 text-xs mt-4">
            No spam, ever. Unsubscribe at any time. By subscribing you agree to our Privacy Policy.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['Weekly Deals', 'Travel Tips', 'Destination Guides', 'Exclusive Offers'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

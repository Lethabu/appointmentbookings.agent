'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function useDebounce(callback, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default function SalonCreatorPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [subdomain, setSubdomain] = useState('');
  const [availability, setAvailability] = useState(null); // null, true, or false
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkAvailability = useDebounce(async (value) => {
    if (value.length < 3) {
      setAvailability(null);
      return;
    }
    setLoading(true);
    const { count, error } = await supabase
      .from('salons')
      .select('*', { count: 'exact', head: true })
      .or(`subdomain.eq.${value},custom_domain.eq.${value}`);
    if (error) {
      setAvailability(false);
    } else {
      setAvailability(count === 0);
    }
    setLoading(false);
  }, 500);

  const handleSubdomainChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(value);
    setAvailability(null);
    checkAvailability(value);
  };

  const createSalon = async (e) => {
    e.preventDefault();
    if (!availability) {
      setError('This subdomain is not available. Please choose another.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data: salon, error: insertError } = await supabase
      .from('salons')
      .insert({
        name: `${user.user_metadata.full_name}'s Salon`,
        subdomain: subdomain,
        owner_id: user.id,
      })
      .select()
      .single();
    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Create Your Salon</h1>
        <form onSubmit={createSalon} className="space-y-4">
          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">Salon Subdomain</label>
            <input
              id="subdomain"
              name="subdomain"
              type="text"
              value={subdomain}
              onChange={handleSubdomainChange}
              required
              minLength={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. glamhub"
            />
            {availability === true && <p className="text-green-600 text-sm mt-1">Subdomain is available!</p>}
            {availability === false && <p className="text-red-600 text-sm mt-1">Subdomain is taken or invalid.</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !availability}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Salon'}
          </button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

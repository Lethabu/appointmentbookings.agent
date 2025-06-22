'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Supabase will handle the session automatically
    // Optionally, you can fetch the session and redirect
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    };
    checkSession();
  }, [router, supabase]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold">Signing you in...</h1>
        <p className="text-gray-700">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}

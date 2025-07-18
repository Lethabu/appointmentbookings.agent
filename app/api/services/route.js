import { createRouteHandlerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return new Response('Unauthorized', { status: 401 });

  // Get salon ID from owner
  const { data: salon } = await supabase
    .from('salons')
    .select('id')
    .eq('owner_id', session.user.id)
    .single();

  if (!salon) return new Response('No salon found', { status: 403 });

  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('salon_id', salon.id)
    .order('created_at', { ascending: true });
  return Response.json(data);
}

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return new Response('Unauthorized', { status: 401 });

  // Get salon ID from owner
  const { data: salon } = await supabase
    .from('salons')
    .select('id')
    .eq('owner_id', session.user.id)
    .single();

  if (!salon) return new Response('No salon found', { status: 403 });

  const body = await request.json();
  const { error } = await supabase
    .from('services')
    .insert({ ...body, salon_id: salon.id });

  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return new Response('Success', { status: 201 });
}

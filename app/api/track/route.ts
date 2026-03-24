import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { shared_link_id, src } = await req.json();

  if (!shared_link_id || !src) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createClient();

  // fire and forget — we don't await the result
  await supabase.from('referral_events').insert({ shared_link_id, src });

  return NextResponse.json({ ok: true });
}
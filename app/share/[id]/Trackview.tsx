'use client';

import { useEffect } from 'react';

export default function TrackView({ id, src }: { id: string; src: string | undefined }) {
  useEffect(() => {
    if (!src) return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shared_link_id: id, src }),
      keepalive: true, 
    });
  }, []);

  return null; // renders nothing, just fires the tracking
}
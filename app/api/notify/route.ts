// app/api/notify/route.ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId, title, message } = await req.json()

  // Use fetch to POST to `/api/socket` (or store queue, etc.)
  const notify = await fetch('http://localhost:3000/api/push-notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, title, message }),
  })

  return new Response('ok')
}

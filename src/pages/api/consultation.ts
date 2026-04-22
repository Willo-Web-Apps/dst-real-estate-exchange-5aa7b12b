import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, propertyValue, timeline } = await request.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Add to Willo email subscriber list
    const willoRes = await fetch('https://api.willo.ai/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.WILLO_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        name,
        tags: ['consultation-request', `value-${propertyValue}`, `timeline-${timeline}`],
        source: 'guide-consultation-form',
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Still return 200 so the front-end shows the thank you state
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
};

export default async function handler(request) {
  return new Response(JSON.stringify({ok: true, env: process.env.UPSTASH_REDIS_REST_URL ? 'set' : 'missing'}), {
    status: 200,
    headers: {'Content-Type': 'application/json'}
  });
}

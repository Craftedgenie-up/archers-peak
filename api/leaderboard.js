import { Redis } from '@upstash/redis';

const MAX_NAME = 12;
const MAX_SCORE = 5000;
const redis = Redis.fromEnv();
const KEY = 'archers-peak:lb';

function respond(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '');
}

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path !== '/api/leaderboard') {
    return respond(404, { error: 'Not found' });
  }

  // GET: top 10
  if (request.method === 'GET') {
    try {
      const results = await redis.zRangeWithScores(KEY, 0, 9);
      const result = results
        .map(({ member, score }) => {
          const name = String(member || '');
          const s = parseInt(score, 10);
          if (name && !isNaN(s)) return { name, score: s };
          return null;
        })
        .filter(Boolean)
        .reverse(); // zRangeWithScores returns ascending; we want descending
      return respond(200, result);
    } catch (err) {
      if (err.status === 404 || err.status === 400) {
        return respond(200, []);
      }
      return respond(500, { error: 'Internal server error: ' + String(err.message || err) });
    }
  }

  // POST: submit score
  if (request.method === 'POST') {
    try {
      let body;
      try {
        body = await request.json();
      } catch {
        return respond(400, { error: 'Invalid JSON body' });
      }

      if (!body || typeof body.name !== 'string' || typeof body.score !== 'number') {
        return respond(400, { error: 'Missing name or score field' });
      }

      const cleanName = stripHtml(body.name).trim().replace(/[^a-zA-Z0-9 _\-]/g, '').substring(0, MAX_NAME);
      if (cleanName.length < 1 || cleanName.length > MAX_NAME) {
        return respond(400, { error: `Name must be 1-${MAX_NAME} characters` });
      }

      const score = Math.round(body.score);
      if (!Number.isFinite(score) || score < 0 || score > MAX_SCORE) {
        return respond(400, { error: 'Score must be an integer 0-5000' });
      }

      try {
        await redis.zAdd(KEY, { score, value: cleanName }, { gt: true });
      } catch (zaddErr) {
        // GT may fail if key doesn't exist yet — fall back to plain zadd
        try {
          await redis.zAdd(KEY, { score, value: cleanName });
        } catch (plainErr) {
          return respond(500, { error: 'Failed to write to Redis' });
        }
      }

      return respond(200, { ok: true, name: cleanName, score });
    } catch (err) {
      return respond(500, { error: 'Internal server error: ' + String(err.message || err) });
    }
  }

  return respond(405, { error: 'Method not allowed' });
}

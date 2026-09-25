import { setCsrfToken } from './productStore';

async function readPayload(response) {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Admin API is not responding. Restart the development server with `npm run dev` and try again.');
  }
  try { return await response.json(); }
  catch { throw new Error('Admin API returned an invalid response. Restart it with `npm run dev` and try again.'); }
}

async function sessionRequest() {
  let response;
  try {
    response = await fetch('/api/index.php?route=session', { credentials: 'include', cache: 'no-store' });
  } catch {
    throw new Error('Admin API is not reachable. Restart the development server with `npm run dev` and try again.');
  }
  const payload = await readPayload(response);
  if (!response.ok) throw new Error(payload.error || 'Admin service is unavailable.');
  setCsrfToken(payload.csrfToken);
  return payload;
}

export async function getAdminUser() {
  const { user } = await sessionRequest();
  return user;
}

export async function signInAdmin(email, password) {
  const { csrfToken } = await sessionRequest();
  const response = await fetch('/api/index.php?route=login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ email, password }),
  });
  const payload = await readPayload(response);
  if (!response.ok) throw new Error(payload.error || 'Sign-in failed.');
  setCsrfToken(payload.csrfToken);
  return payload.user;
}

export async function signOutAdmin() {
  const { csrfToken } = await sessionRequest();
  const response = await fetch('/api/index.php?route=logout', {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRF-Token': csrfToken },
  });
  const payload = await readPayload(response);
  if (!response.ok) throw new Error(payload.error || 'Sign-out failed.');
  setCsrfToken('');
}

export async function createAdminAccount(email, password) {
  const { csrfToken } = await sessionRequest();
  const response = await fetch('/api/index.php?route=admins', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ email, password }),
  });
  const payload = await readPayload(response);
  if (!response.ok) throw new Error(payload.error || 'Could not create administrator account.');
  return payload;
}

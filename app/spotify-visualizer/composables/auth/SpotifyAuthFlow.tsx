// Utility
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], '');
  localStorage.setItem('code_verifier', codeVerifier);
  return codeVerifier;
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// const
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const redirectUri = 'http://127.0.0.1:5173/spotify-visualizer';
const scope = 'user-read-private user-read-email';

// Initial redirect
async function redirectToSpotifyAuth() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  authUrl.search = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }).toString();

  window.location.href = authUrl.toString();
}

// Token exchange post initial redirect
async function handleSpotifyToken() {
  const code = new URLSearchParams(window.location.search).get('code');
  if (!code) return null;

  const codeVerifier = localStorage.getItem('code_verifier');
  if (!codeVerifier) throw new Error('Missing code_verifier');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  const data = (await res.json()) as any;

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }

  return data;
}

// Initializer
export async function initSpotifyAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) await redirectToSpotifyAuth();
  else await handleSpotifyToken();
}

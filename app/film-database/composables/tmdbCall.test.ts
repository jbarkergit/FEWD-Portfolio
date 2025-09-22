import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createEndpoint, tmdbCall } from '~/film-database/composables/tmdbCall';

describe(tmdbCall, () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('Prevents run time crashes caused by bad arguments.', async () => {
    await expect(tmdbCall(new AbortController(), 'not_playing' as any)).resolves.toMatchObject({
      key: 'not_playing',
      response: undefined,
    });
  });

  it('Caches keys with exclusions, prevents API calls by returning cached key value pairs', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ foo: 'bar' }),
    });

    const first = await tmdbCall(new AbortController(), 'now_playing');
    const second = await tmdbCall(new AbortController(), 'now_playing');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(first.response).toEqual({ foo: 'bar' });
    expect(second.response).toEqual({ foo: 'bar' });
  });

  it('Properly builds endpoints for all potential arguments', () => {
    expect(createEndpoint('not_a_arg' as any, undefined)).toBeUndefined();
    expect(createEndpoint('now_playing', undefined)).toContain('now_playing');
    expect(createEndpoint('credits', 123456)).toContain('123456');
  });

  it('Calls API with correct methods', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as any);

    await tmdbCall(new AbortController(), 'upcoming');

    const call = mockFetch.mock.calls[0] as Parameters<typeof fetch>;
    const [url, options] = call;

    expect(url).toMatch(/upcoming/);
    expect(options).toMatchObject({
      method: 'GET',
      headers: expect.objectContaining({
        accept: 'application/json',
        Authorization: expect.stringContaining('Bearer '),
      }),
      signal: expect.any(AbortSignal),
    });
  });

  it('Aborts fetch request when controller is aborted', async () => {
    const controller = new AbortController();
    const abortSpy = vi.spyOn(controller, 'abort');
    const promise = tmdbCall(controller, 'upcoming');

    controller.abort();

    await promise;

    expect(abortSpy).toHaveBeenCalled();
  });

  it('Handles network/API failures gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error');

    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network failure'));

    expect(await tmdbCall(new AbortController(), 'now_playing')).toEqual({
      key: 'now_playing',
      response: undefined,
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});

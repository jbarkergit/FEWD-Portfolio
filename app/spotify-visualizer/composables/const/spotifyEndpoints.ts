import { buildSpotifyEndpoint } from '~/spotify-visualizer/composables/helpers/buildSpotifyEndpoint';
import type { SpotifyBodyParams } from '~/spotify-visualizer/composables/types/SpotifyBodyParams';
import type { SpotifyPathParams } from '~/spotify-visualizer/composables/types/SpotifyPathParams';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type SpotifyRequest = {
  method: Method;
  endpoint: string;
  body?: Record<string, any>;
};

const endpoints = {
  albums: {
    getAlbum: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/albums/{id}`, pathParams),
    }),
    getSeveralAlbums: (pathParams: Pick<SpotifyPathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/albums`, pathParams),
    }),
    getAlbumTracks: (pathParams: Pick<SpotifyPathParams, 'id' | 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/albums/{id}/tracks`, pathParams),
    }),
    getUsersSavedAlbums: (pathParams: Pick<SpotifyPathParams, 'limit' | 'offset' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
    }),
    saveAlbumsForCurrentUser: (pathParams = undefined, body: Pick<SpotifyBodyParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
      body,
    }),
    removeUsersSavedAlbums: (pathParams: undefined, body: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
      body,
    }),
    checkUsersSavedAlbums: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/albums/contains`, pathParams),
    }),
    getNewReleases: (pathParams: Pick<SpotifyPathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/browse/new-releases`, pathParams),
    }),
  },
  artists: {
    getArtist: (pathParams: Pick<SpotifyPathParams, 'id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/artists/{id}`, pathParams),
    }),
    getSeveralArtists: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/artists`, pathParams),
    }),
    getArtistsAlbums: (
      pathParams: Pick<SpotifyPathParams, 'id' | 'include_groups' | 'market' | 'limit' | 'offset'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/artists/{id}/albums`, pathParams),
    }),
    getArtistsTopTracks: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/artists/{id}/top-tracks`, pathParams),
    }),
    // getArtistsRelatedTracks
  },
  audiobooks: {
    getAnAudiobook: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/audiobooks/{id}`, pathParams),
    }),
    getSeveralAudiobooks: (pathParams: Pick<SpotifyPathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/audiobooks`, pathParams),
    }),
    getAudiobookChapters: (
      pathParams: Pick<SpotifyPathParams, 'id' | 'market' | 'limit' | 'offset'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/audiobooks/{id}/chapters`, pathParams),
    }),
    getUsersSavedAudiobooks: (pathParams: Pick<SpotifyPathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/audiobooks`, pathParams),
    }),
    saveAudiobooksForCurrentUser: (body: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/audiobooks`, undefined),
      body,
    }),
    removeUsersSavedAudiobooks: (body: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/audiobooks`, undefined),
      body,
    }),
    checkUsersSavedAudiobooks: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/audiobooks/contains`, pathParams),
    }),
  },
  categories: {
    getSeveralBrowseCategories: (
      pathParams: Pick<SpotifyPathParams, 'locale' | 'limit' | 'offset'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/browse/categories`, pathParams),
    }),
    getSingleBrowseCategory: (pathParams: Pick<SpotifyPathParams, 'category_id' | 'locale'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/browse/categories/{category_id}`, pathParams),
    }),
  },
  chapters: {
    getAChapter: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/chapters/{id}`, pathParams),
    }),
    getSeveralChapters: (pathParams: Pick<SpotifyPathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/chapters`, pathParams),
    }),
  },
  episodes: {
    getEpisode: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/episodes/{id}`, pathParams),
    }),
    getSeveralEpisodes: (pathParams: Pick<SpotifyPathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/episodes`, pathParams),
    }),
    getUsersSavedEpisodes: (pathParams: Pick<SpotifyPathParams, 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/episodes`, pathParams),
    }),
    saveEpisodesForCurrentUser: (body: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/episodes`, undefined),
      body,
    }),
    removeUsersSavedEpisodes: (body: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/episodes`, undefined),
      body,
    }),
    checkUsersSavedEpisodes: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/episodes/contains`, pathParams),
    }),
  },
  //   genres: {
  //     getAvailableGenreSeeds
  //   },
  markets: {
    getAvailableMarkets: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/markets`, undefined),
    }),
  },
  player: {
    getPlaybackState: (pathParams: Pick<SpotifyPathParams, 'market' | 'additional_types'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player`, pathParams),
    }),
    transferPlayback: (body: Pick<SpotifyPathParams, 'device_ids' | 'play'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player`, undefined),
      body,
    }),
    getAvailableDevices: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/devices`, undefined),
    }),
    getCurrentlyPlayingTrack: (pathParams: Pick<SpotifyPathParams, 'market' | 'additional_types'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/currently-playing`, pathParams),
    }),
    startOrResumePlayback: (body: Pick<SpotifyPathParams, 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/play`, undefined),
      body,
    }),
    pausePlayback: (body: Pick<SpotifyPathParams, 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/pause`, undefined),
      body,
    }),
    skipToNext: (body: Pick<SpotifyPathParams, 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/next`, undefined),
      body,
    }),
    skipToPrevious: (body: Pick<SpotifyPathParams, 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/previous`, undefined),
      body,
    }),
    seekToPosition: (body: Pick<SpotifyPathParams, 'position_ms' | 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/seek`, undefined),
      body,
    }),
    setRepeatMode: (body: Pick<SpotifyPathParams, 'state' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/repeat`, undefined),
      body,
    }),
    setPlaybackVolume: (body: Pick<SpotifyPathParams, 'volume_percent' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/volume`, undefined),
      body,
    }),
    togglePlaybackShuffle: (body: Pick<SpotifyPathParams, 'state' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/shuffle`, undefined),
      body,
    }),
    getRecentlyPlayedTracks: (pathParams: Pick<SpotifyPathParams, 'limit' | 'after' | 'before'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/recently-played`, pathParams),
    }),
    getTheUsersQueue: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/queue`, undefined),
    }),
    addItemsToPlaybackQueue: (body: Pick<SpotifyPathParams, 'uri' | 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/player/queue`, undefined),
      body,
    }),
  },
  playlists: {
    getPlaylist: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id' | 'market' | 'fields' | 'additional_types'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}`, pathParams),
    }),
    changePlaylistDetails: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id'>,
      body: Pick<SpotifyBodyParams, 'name' | 'public' | 'collaborative' | 'description'>
    ): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}`, pathParams),
      body,
    }),
    getPlaylistItems: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id' | 'market' | 'fields' | 'limit' | 'offset' | 'additional_types'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
    }),
    updatePlaylistItems: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id' | 'uris'>,
      body: Pick<SpotifyBodyParams, 'uris' | 'range_start' | 'insert_before' | 'range_length' | 'snapshot_id'>
    ): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    addItemsToPlaylist: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id'>,
      body: Pick<SpotifyBodyParams, 'position' | 'uris'>
    ): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    removePlaylistItems: (
      pathParams: Pick<SpotifyPathParams, 'playlist_id'>,
      body: Pick<SpotifyBodyParams, 'tracks' | 'uri' | 'snapshot_id'>
    ): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    getCurrentUsersPlaylists: (pathParams: Pick<SpotifyPathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/playlists`, pathParams),
    }),
    getUsersPlaylists: (pathParams: Pick<SpotifyPathParams, 'user_id' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/users/{user_id}/playlists`, pathParams),
    }),
    createPlaylist: (
      pathParams: Pick<SpotifyPathParams, 'user_id'>,
      body: Pick<SpotifyBodyParams, 'name' | 'public' | 'collaborative' | 'description'>
    ): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/users/{user_id}/playlists`, pathParams),
      body,
    }),
    // getFeaturedPlaylists
    // getCategorysPlaylists
    getPlaylistCoverImage: (pathParams: Pick<SpotifyPathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/images`, pathParams),
    }),
    addCustomPlaylistCoverImage: (pathParams: Pick<SpotifyPathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/images`, pathParams),
    }),
  },
  search: {
    searchForItem: (
      pathParams: Pick<SpotifyPathParams, 'q' | 'type' | 'market' | 'limit' | 'offset' | 'include_external'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/search`, pathParams),
    }),
  },
  shows: {
    getShow: (pathParams: Pick<SpotifyPathParams, 'market' | 'id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/shows/{id}`, pathParams),
    }),
    getSeveralShows: (pathParams: Pick<SpotifyPathParams, 'market' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/shows`, pathParams),
    }),
    getShowEpisodes: (pathParams: Pick<SpotifyPathParams, 'id' | 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/shows/{id}/episodes`, pathParams),
    }),
    getUsersSavedShows: (pathParams: Pick<SpotifyPathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    saveShowsForCurrentUser: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    removeUsersSavedShows: (pathParams: Pick<SpotifyPathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    checkUsersSavedShows: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/shows/contains`, pathParams),
    }),
  },
  tracks: {
    getTrack: (pathParams: Pick<SpotifyPathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/tracks/{id}`, pathParams),
    }),
    getSeveralTracks: (pathParams: Pick<SpotifyPathParams, 'market' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/tracks`, pathParams),
    }),
    getUsersSavedTracks: (pathParams: Pick<SpotifyPathParams, 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/tracks`, pathParams),
    }),
    saveTracksForCurrentUser: (body: Pick<SpotifyBodyParams, 'ids' | 'timestamped_ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/tracks`, undefined),
      body,
    }),
    removeUsersSavedTracks: (body: Pick<SpotifyBodyParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/tracks`, undefined),
      body,
    }),
    checkUsersSavedTracks: (pathParams: Pick<SpotifyPathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/tracks/contains`, pathParams),
    }),
    // getSeveralTracksAudioFeatures
    // getTracksAudioFeatures
    // getTracksAudioAnalysis
    // getRecommendations
  },
  users: {
    getCurrentUsersProfile: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me`, undefined),
    }),
    getUsersTopItems: (
      pathParams: Pick<SpotifyPathParams, 'type' | 'time_range' | 'limit' | 'offset'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/top/{type}`, pathParams),
    }),
    getUsersProfile: (pathParams: Pick<SpotifyPathParams, 'user_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/users/{user_id}`, pathParams),
    }),
    followPlaylist: (pathParams: Pick<SpotifyPathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`, pathParams),
    }),
    unfollowPlaylist: (pathParams: Pick<SpotifyPathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`, pathParams),
    }),
    getFollowedArtists: (pathParams: Pick<SpotifyPathParams, 'type' | 'after' | 'limit'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
    }),
    followArtistsOrUsers: (pathParams: Pick<SpotifyPathParams, 'type' | 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
    }),
    unfollowArtistsOrUsers: (
      pathParams: Pick<SpotifyPathParams, 'type' | 'ids'>,
      body: Pick<SpotifyBodyParams, 'ids'>
    ): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
      body,
    }),
    checkIfUserFollowsArtistsOrUsers: (pathParams: Pick<SpotifyPathParams, 'type' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(`https://api.spotify.com/v1/me/following/contains`, pathParams),
    }),
    checkIfCurrentUserFollowsPlaylist: (pathParams: Pick<SpotifyPathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildSpotifyEndpoint(
        `https://api.spotify.com/v1/playlists/{playlist_id}/followers/contains`,
        pathParams
      ),
    }),
  },
} as const;

export const spotifyEndpoints = {
  ...endpoints.albums,
  ...endpoints.artists,
  ...endpoints.audiobooks,
  ...endpoints.categories,
  ...endpoints.chapters,
  ...endpoints.episodes,
  ...endpoints.markets,
  ...endpoints.player,
  ...endpoints.playlists,
  ...endpoints.search,
  ...endpoints.shows,
  ...endpoints.tracks,
  ...endpoints.users,
} as const;

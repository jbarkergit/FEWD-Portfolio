type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type PathParams = {
  id: string;
  ids: number[];
  category_id: string;
  genres: string[];
  market: keyof typeof iso.market;
  markets: (keyof typeof iso.market)[];
  locale: keyof typeof iso.market;
  limit: number;
  offset: number;
  additional_types: string;
  device_id: string;
  device_ids: string[];
  play: boolean;
  position_ms: number;
  state: 'track' | 'context' | 'off';
  volume_percent: number;
  after: number;
  before: number;
  uri: string;
  playlist_id: string;
  fields: string;
  uris: string[];
  position: number;
  user_id: string;
  q: 'album' | 'artist' | 'track' | 'year' | 'upc' | 'tag:hipster' | 'tag:new' | 'isrc' | 'genre';
  type: string[];
  include_external: 'audio';
  seed_artists: string[];
  seed_genres: string[];
  seed_tracks: string[];
  min_acousticness: number;
  max_acousticness: number;
  target_acousticness: number;
  min_danceability: number;
  max_danceability: number;
  target_danceability: number;
  min_duration_ms: number;
  max_duration_ms: number;
  target_duration_ms: number;
  min_energy: number;
  max_energy: number;
  target_energy: number;
  min_instrumentalness: number;
  max_instrumentalness: number;
  target_instrumentalness: number;
  min_key: number;
  max_key: number;
  target_key: number;
  min_liveness: number;
  max_liveness: number;
  target_liveness: number;
  min_loudness: number;
  max_loudness: number;
  target_loudness: number;
  min_mode: number;
  max_mode: number;
  target_mode: number;
  min_popularity: number;
  max_popularity: number;
  target_popularity: number;
  min_speechiness: number;
  max_speechiness: number;
  target_speechiness: number;
  min_tempo: number;
  max_tempo: number;
  target_tempo: number;
  min_time_signature: number;
  max_time_signature: number;
  target_time_signature: number;
  min_valence: number;
  max_valence: number;
  target_valence: number;
  time_range: string;
  include_groups: string[];
};

type BodyParams = {
  ids: string[];
  name: string;
  public: boolean;
  collaborative: boolean;
  description: string;
  uris: string[];
  range_start: number;
  insert_before: number;
  range_length: number;
  snapshot_id: string;
  position: number;
  tracks: {}[];
  uri: string;
  timestamped_ids: { id: string; added_at: string }[];
};

const iso = {
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  base: 'market=',
  get market() {
    return {
      Afghanistan: `${this.base}AF`,
      Albania: `${this.base}AL`,
      Algeria: `${this.base}DZ`,
      Andorra: `${this.base}AD`,
      Angola: `${this.base}AO`,
      Argentina: `${this.base}AR`,
      Armenia: `${this.base}AM`,
      Australia: `${this.base}AU`,
      Austria: `${this.base}AT`,
      Azerbaijan: `${this.base}AZ`,
      Bahrain: `${this.base}BH`,
      Bangladesh: `${this.base}BD`,
      Belarus: `${this.base}BY`,
      Belgium: `${this.base}BE`,
      Belize: `${this.base}BZ`,
      Benin: `${this.base}BJ`,
      Bhutan: `${this.base}BT`,
      Bolivia: `${this.base}BO`,
      'Bosnia and Herzegovina': `${this.base}BA`,
      Botswana: `${this.base}BW`,
      Brazil: `${this.base}BR`,
      Bulgaria: `${this.base}BG`,
      'Burkina Faso': `${this.base}BF`,
      Burundi: `${this.base}BI`,
      Cambodia: `${this.base}KH`,
      Cameroon: `${this.base}CM`,
      Canada: `${this.base}CA`,
      'Cape Verde': `${this.base}CV`,
      'Central African Republic': `${this.base}CF`,
      Chad: `${this.base}TD`,
      Chile: `${this.base}CL`,
      China: `${this.base}CN`,
      Colombia: `${this.base}CO`,
      Congo: `${this.base}CG`,
      'Costa Rica': `${this.base}CR`,
      'Côte d’Ivoire': `${this.base}CI`,
      Croatia: `${this.base}HR`,
      Cyprus: `${this.base}CY`,
      'Czech Republic': `${this.base}CZ`,
      Denmark: `${this.base}DK`,
      Djibouti: `${this.base}DJ`,
      'Dominican Republic': `${this.base}DO`,
      Ecuador: `${this.base}EC`,
      Egypt: `${this.base}EG`,
      'El Salvador': `${this.base}SV`,
      Estonia: `${this.base}EE`,
      Ethiopia: `${this.base}ET`,
      Fiji: `${this.base}FJ`,
      Finland: `${this.base}FI`,
      France: `${this.base}FR`,
      Gabon: `${this.base}GA`,
      Georgia: `${this.base}GE`,
      Germany: `${this.base}DE`,
      Ghana: `${this.base}GH`,
      Greece: `${this.base}GR`,
      Guatemala: `${this.base}GT`,
      Guinea: `${this.base}GN`,
      'Guinea-Bissau': `${this.base}GW`,
      Honduras: `${this.base}HN`,
      'Hong Kong': `${this.base}HK`,
      Hungary: `${this.base}HU`,
      Iceland: `${this.base}IS`,
      India: `${this.base}IN`,
      Indonesia: `${this.base}ID`,
      Ireland: `${this.base}IE`,
      Israel: `${this.base}IL`,
      Italy: `${this.base}IT`,
      Jamaica: `${this.base}JM`,
      Japan: `${this.base}JP`,
      Jordan: `${this.base}JO`,
      Kazakhstan: `${this.base}KZ`,
      Kenya: `${this.base}KE`,
      Kuwait: `${this.base}KW`,
      Kyrgyzstan: `${this.base}KG`,
      Laos: `${this.base}LA`,
      Latvia: `${this.base}LV`,
      Lebanon: `${this.base}LB`,
      Lesotho: `${this.base}LS`,
      Liberia: `${this.base}LR`,
      Libya: `${this.base}LY`,
      Liechtenstein: `${this.base}LI`,
      Lithuania: `${this.base}LT`,
      Luxembourg: `${this.base}LU`,
      Macau: `${this.base}MO`,
      'North Macedonia': `${this.base}MK`,
      Madagascar: `${this.base}MG`,
      Malawi: `${this.base}MW`,
      Malaysia: `${this.base}MY`,
      Mali: `${this.base}ML`,
      Malta: `${this.base}MT`,
      Mauritania: `${this.base}MR`,
      Mauritius: `${this.base}MU`,
      Mexico: `${this.base}MX`,
      Moldova: `${this.base}MD`,
      Monaco: `${this.base}MC`,
      Mongolia: `${this.base}MN`,
      Montenegro: `${this.base}ME`,
      Morocco: `${this.base}MA`,
      Mozambique: `${this.base}MZ`,
      Myanmar: `${this.base}MM`,
      Namibia: `${this.base}NA`,
      Nepal: `${this.base}NP`,
      Netherlands: `${this.base}NL`,
      'New Zealand': `${this.base}NZ`,
      Nicaragua: `${this.base}NI`,
      Niger: `${this.base}NE`,
      Nigeria: `${this.base}NG`,
      Norway: `${this.base}NO`,
      Oman: `${this.base}OM`,
      Pakistan: `${this.base}PK`,
      Panama: `${this.base}PA`,
      'Papua New Guinea': `${this.base}PG`,
      Paraguay: `${this.base}PY`,
      Peru: `${this.base}PE`,
      Philippines: `${this.base}PH`,
      Poland: `${this.base}PL`,
      Portugal: `${this.base}PT`,
      Qatar: `${this.base}QA`,
      Romania: `${this.base}RO`,
      Russia: `${this.base}RU`,
      Rwanda: `${this.base}RW`,
      'Saudi Arabia': `${this.base}SA`,
      Senegal: `${this.base}SN`,
      Serbia: `${this.base}RS`,
      Singapore: `${this.base}SG`,
      Slovakia: `${this.base}SK`,
      Slovenia: `${this.base}SI`,
      'South Africa': `${this.base}ZA`,
      'South Korea': `${this.base}KR`,
      Spain: `${this.base}ES`,
      'Sri Lanka': `${this.base}LK`,
      Sweden: `${this.base}SE`,
      Switzerland: `${this.base}CH`,
      Taiwan: `${this.base}TW`,
      Tanzania: `${this.base}TZ`,
      Thailand: `${this.base}TH`,
      Tunisia: `${this.base}TN`,
      Turkey: `${this.base}TR`,
      Ukraine: `${this.base}UA`,
      'United Arab Emirates': `${this.base}AE`,
      'United Kingdom': `${this.base}GB`,
      USA: `${this.base}US`,
      Uruguay: `${this.base}UY`,
      Venezuela: `${this.base}VE`,
      Vietnam: `${this.base}VN`,
      Zambia: `${this.base}ZM`,
      Zimbabwe: `${this.base}ZW`,
    };
  },
};

const buildEndpoint = (endpoint: string, pathParams: Partial<PathParams> | undefined): string => {
  // defaultLimit: 50, // spotify default: 20

  if (pathParams) {
  }

  return endpoint;
};

type SpotifyRequest = {
  method: Method;
  endpoint: string;
  body?: Record<string, any>;
};

const endpoints = {
  albums: {
    getAlbum: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/albums/{id}`, pathParams),
    }),
    getSeveralAlbums: (pathParams: Pick<PathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/albums`, pathParams),
    }),
    getAlbumTracks: (pathParams: Pick<PathParams, 'id' | 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/albums/{id}/tracks`, pathParams),
    }),
    getUsersSavedAlbums: (pathParams: Pick<PathParams, 'limit' | 'offset' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
    }),
    saveAlbumsForCurrentUser: (pathParams = undefined, body: Pick<BodyParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
      body,
    }),
    removeUsersSavedAlbums: (pathParams: undefined, body: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/albums`, pathParams),
      body,
    }),
    checkUsersSavedAlbums: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/albums/contains`, pathParams),
    }),
    getNewReleases: (pathParams: Pick<PathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/browse/new-releases`, pathParams),
    }),
  },
  artists: {
    getArtist: (pathParams: Pick<PathParams, 'id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/artists/{id}`, pathParams),
    }),
    getSeveralArtists: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/artists`, pathParams),
    }),
    getArtistsAlbums: (
      pathParams: Pick<PathParams, 'id' | 'include_groups' | 'market' | 'limit' | 'offset'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/artists/{id}/albums`, pathParams),
    }),
    getArtistsTopTracks: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/artists/{id}/top-tracks`, pathParams),
    }),
    // getArtistsRelatedTracks
  },
  audiobooks: {
    getAnAudiobook: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/audiobooks/{id}`, pathParams),
    }),
    getSeveralAudiobooks: (pathParams: Pick<PathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/audiobooks`, pathParams),
    }),
    getAudiobookChapters: (pathParams: Pick<PathParams, 'id' | 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/audiobooks/{id}/chapters`, pathParams),
    }),
    getUsersSavedAudiobooks: (pathParams: Pick<PathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/audiobooks`, pathParams),
    }),
    saveAudiobooksForCurrentUser: (body: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/audiobooks`, undefined),
      body,
    }),
    removeUsersSavedAudiobooks: (body: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/audiobooks`, undefined),
      body,
    }),
    checkUsersSavedAudiobooks: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/audiobooks/contains`, pathParams),
    }),
  },
  categories: {
    getSeveralBrowseCategories: (pathParams: Pick<PathParams, 'locale' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/browse/categories`, pathParams),
    }),
    getSingleBrowseCategory: (pathParams: Pick<PathParams, 'category_id' | 'locale'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/browse/categories/{category_id}`, pathParams),
    }),
  },
  chapters: {
    getAChapter: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/chapters/{id}`, pathParams),
    }),
    getSeveralChapters: (pathParams: Pick<PathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/chapters`, pathParams),
    }),
  },
  episodes: {
    getEpisode: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/episodes/{id}`, pathParams),
    }),
    getSeveralEpisodes: (pathParams: Pick<PathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/episodes`, pathParams),
    }),
    getUsersSavedEpisodes: (pathParams: Pick<PathParams, 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/episodes`, pathParams),
    }),
    saveEpisodesForCurrentUser: (body: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/episodes`, undefined),
      body,
    }),
    removeUsersSavedEpisodes: (body: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/episodes`, undefined),
      body,
    }),
    checkUsersSavedEpisodes: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/episodes/contains`, pathParams),
    }),
  },
  //   genres: {
  //     getAvailableGenreSeeds
  //   },
  markets: {
    getAvailableMarkets: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/markets`, undefined),
    }),
  },
  player: {
    getPlaybackState: (pathParams: Pick<PathParams, 'market' | 'additional_types'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player`, pathParams),
    }),
    transferPlayback: (body: Pick<PathParams, 'device_ids' | 'play'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player`, undefined),
      body,
    }),
    getAvailableDevices: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/devices`, undefined),
    }),
    getCurrentlyPlayingTrack: (pathParams: Pick<PathParams, 'market' | 'additional_types'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/currently-playing`, pathParams),
    }),
    startOrResumePlayback: (body: Pick<PathParams, 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/play`, undefined),
      body,
    }),
    pausePlayback: (body: Pick<PathParams, 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/pause`, undefined),
      body,
    }),
    skipToNext: (body: Pick<PathParams, 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/next`, undefined),
      body,
    }),
    skipToPrevious: (body: Pick<PathParams, 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/previous`, undefined),
      body,
    }),
    seekToPosition: (body: Pick<PathParams, 'position_ms' | 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/seek`, undefined),
      body,
    }),
    setRepeatMode: (body: Pick<PathParams, 'state' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/repeat`, undefined),
      body,
    }),
    setPlaybackVolume: (body: Pick<PathParams, 'volume_percent' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/volume`, undefined),
      body,
    }),
    togglePlaybackShuffle: (body: Pick<PathParams, 'state' | 'device_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/shuffle`, undefined),
      body,
    }),
    getRecentlyPlayedTracks: (pathParams: Pick<PathParams, 'limit' | 'after' | 'before'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/recently-played`, pathParams),
    }),
    getTheUsersQueue: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/queue`, undefined),
    }),
    addItemsToPlaybackQueue: (body: Pick<PathParams, 'uri' | 'device_id'>): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/player/queue`, undefined),
      body,
    }),
  },
  playlists: {
    getPlaylist: (
      pathParams: Pick<PathParams, 'playlist_id' | 'market' | 'fields' | 'additional_types'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}`, pathParams),
    }),
    changePlaylistDetails: (
      pathParams: Pick<PathParams, 'playlist_id'>,
      body: Pick<BodyParams, 'name' | 'public' | 'collaborative' | 'description'>
    ): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}`, pathParams),
      body,
    }),
    getPlaylistItems: (
      pathParams: Pick<PathParams, 'playlist_id' | 'market' | 'fields' | 'limit' | 'offset' | 'additional_types'>
    ): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
    }),
    updatePlaylistItems: (
      pathParams: Pick<PathParams, 'playlist_id' | 'uris'>,
      body: Pick<BodyParams, 'uris' | 'range_start' | 'insert_before' | 'range_length' | 'snapshot_id'>
    ): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    addItemsToPlaylist: (
      pathParams: Pick<PathParams, 'playlist_id'>,
      body: Pick<BodyParams, 'position' | 'uris'>
    ): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    removePlaylistItems: (
      pathParams: Pick<PathParams, 'playlist_id'>,
      body: Pick<BodyParams, 'tracks' | 'uri' | 'snapshot_id'>
    ): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/tracks`, pathParams),
      body,
    }),
    getCurrentUsersPlaylists: (pathParams: Pick<PathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/playlists`, pathParams),
    }),
    getUsersPlaylists: (pathParams: Pick<PathParams, 'user_id' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/users/{user_id}/playlists`, pathParams),
    }),
    createPlaylist: (
      pathParams: Pick<PathParams, 'user_id'>,
      body: Pick<BodyParams, 'name' | 'public' | 'collaborative' | 'description'>
    ): SpotifyRequest => ({
      method: 'POST',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/users/{user_id}/playlists`, pathParams),
      body,
    }),
    // getFeaturedPlaylists
    // getCategorysPlaylists
    getPlaylistCoverImage: (pathParams: Pick<PathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/images`, pathParams),
    }),
    addCustomPlaylistCoverImage: (pathParams: Pick<PathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/images`, pathParams),
    }),
  },
  search: {
    searchForItem: (
      pathParams: Pick<PathParams, 'q' | 'type' | 'market' | 'limit' | 'offset' | 'include_external'>
    ): SpotifyRequest => ({ method: 'GET', endpoint: buildEndpoint(`https://api.spotify.com/v1/search`, pathParams) }),
  },
  shows: {
    getShow: (pathParams: Pick<PathParams, 'market' | 'id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/shows/{id}`, pathParams),
    }),
    getSeveralShows: (pathParams: Pick<PathParams, 'market' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/shows`, pathParams),
    }),
    getShowEpisodes: (pathParams: Pick<PathParams, 'id' | 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/shows/{id}/episodes`, pathParams),
    }),
    getUsersSavedShows: (pathParams: Pick<PathParams, 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    saveShowsForCurrentUser: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    removeUsersSavedShows: (pathParams: Pick<PathParams, 'ids' | 'market'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/shows`, pathParams),
    }),
    checkUsersSavedShows: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/shows/contains`, pathParams),
    }),
  },
  tracks: {
    getTrack: (pathParams: Pick<PathParams, 'id' | 'market'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/tracks/{id}`, pathParams),
    }),
    getSeveralTracks: (pathParams: Pick<PathParams, 'market' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/tracks`, pathParams),
    }),
    getUsersSavedTracks: (pathParams: Pick<PathParams, 'market' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/tracks`, pathParams),
    }),
    saveTracksForCurrentUser: (body: Pick<BodyParams, 'ids' | 'timestamped_ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/tracks`, undefined),
      body,
    }),
    removeUsersSavedTracks: (body: Pick<BodyParams, 'ids'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/tracks`, undefined),
      body,
    }),
    checkUsersSavedTracks: (pathParams: Pick<PathParams, 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/tracks/contains`, pathParams),
    }),
    // getSeveralTracksAudioFeatures
    // getTracksAudioFeatures
    // getTracksAudioAnalysis
    // getRecommendations
  },
  users: {
    getCurrentUsersProfile: (): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me`, undefined),
    }),
    getUsersTopItems: (pathParams: Pick<PathParams, 'type' | 'time_range' | 'limit' | 'offset'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/top/{type}`, pathParams),
    }),
    getUsersProfile: (pathParams: Pick<PathParams, 'user_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/users/{user_id}`, pathParams),
    }),
    followPlaylist: (pathParams: Pick<PathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`, pathParams),
    }),
    unfollowPlaylist: (pathParams: Pick<PathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`, pathParams),
    }),
    getFollowedArtists: (pathParams: Pick<PathParams, 'type' | 'after' | 'limit'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
    }),
    followArtistsOrUsers: (pathParams: Pick<PathParams, 'type' | 'ids'>): SpotifyRequest => ({
      method: 'PUT',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
    }),
    unfollowArtistsOrUsers: (
      pathParams: Pick<PathParams, 'type' | 'ids'>,
      body: Pick<BodyParams, 'ids'>
    ): SpotifyRequest => ({
      method: 'DELETE',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/following`, pathParams),
      body,
    }),
    checkIfUserFollowsArtistsOrUsers: (pathParams: Pick<PathParams, 'type' | 'ids'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/me/following/contains`, pathParams),
    }),
    checkIfCurrentUserFollowsPlaylist: (pathParams: Pick<PathParams, 'playlist_id'>): SpotifyRequest => ({
      method: 'GET',
      endpoint: buildEndpoint(`https://api.spotify.com/v1/playlists/{playlist_id}/followers/contains`, pathParams),
    }),
  },
} as const;

const flatEndpoints = {
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
};

// https://developer.spotify.com/documentation/web-api
type Response = {
  albums: {
    getAlbum: {
      album_type: string;
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions?: {
        reason: string;
      };
      type: string;
      uri: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from?: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            type: string;
            uri: string;
          };
          restrictions?: {
            reason: string;
          };
          name: string;
          preview_url: string | null;
          track_number: number;
          type: string;
          uri: string;
          is_local: boolean;
        }[];
      };
      copyrights: {
        text: string;
        type: string;
      }[];
      external_ids: {
        isrc: string;
        ean: string;
        upc: string;
      };
      genres: string[];
      label: string;
      popularity: number;
    };
    getSeveralAlbums: {
      albums: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions?: {
          reason: string;
        };
        type: string;
        uri: string;
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        tracks: {
          href: string;
          limit: number;
          next: string | null;
          offset: number;
          previous: string | null;
          total: number;
          items: {
            artists: {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }[];
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit: boolean;
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            is_playable: boolean;
            linked_from?: {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              type: string;
              uri: string;
            };
            restrictions?: {
              reason: string;
            };
            name: string;
            preview_url: string | null;
            track_number: number;
            type: string;
            uri: string;
            is_local: boolean;
          }[];
        };
        copyrights: {
          text: string;
          type: string;
        }[];
        external_ids: {
          isrc: string;
          ean: string;
          upc: string;
        };
        genres: string[];
        label: string;
        popularity: number;
      }[];
    };
    getAlbumTracks: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        restrictions?: {
          reason: string;
        };
        name: string;
        preview_url: string | null;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      }[];
    };
    getUsersSavedAlbums: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        added_at: string;
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          tracks: {
            href: string;
            limit: number;
            next: string | null;
            offset: number;
            previous: string | null;
            total: number;
            items: {
              artists: {
                external_urls: {
                  spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
              }[];
              available_markets: string[];
              disc_number: number;
              duration_ms: number;
              explicit: boolean;
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              is_playable: boolean;
              linked_from?: {
                external_urls: {
                  spotify: string;
                };
                href: string;
                id: string;
                type: string;
                uri: string;
              };
              restrictions?: {
                reason: string;
              };
              name: string;
              preview_url: string | null;
              track_number: number;
              type: string;
              uri: string;
              is_local: boolean;
            }[];
          };
          copyrights: {
            text: string;
            type: string;
          }[];
          external_ids: {
            isrc: string;
            ean: string;
            upc: string;
          };
          genres: string[];
          label: string;
          popularity: number;
        };
      }[];
    };
    saveAlbumsForCurrentUser: unknown;
    removeUsersSavedAlbums: unknown;
    checkUsersSavedAlbums: boolean[];
    getNewReleases: {
      albums: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        }[];
      };
    };
  };
  artists: {
    getArtist: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string | null;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    };
    getSeveralArtists: {
      artists: {
        external_urls: {
          spotify: string;
        };
        followers: {
          href: string | null;
          total: number;
        };
        genres: string[];
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        name: string;
        popularity: number;
        type: string;
        uri: string;
      }[];
    };
    getArtistsAlbums: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions?: {
          reason: string;
        };
        type: string;
        uri: string;
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        album_group: string;
      }[];
    };
    getArtistsTopTracks: {
      tracks: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
          ean: string;
          upc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: Record<string, unknown>;
        restrictions?: {
          reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string | null;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      }[];
    };
    // getArtistsRelatedTracks: () => {},
  };
  audiobooks: {
    getAnAudiobook: {
      authors: {
        name: string;
      }[];
      available_markets: string[];
      copyrights: {
        text: string;
        type: string;
      }[];
      description: string;
      html_description: string;
      edition: string;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      languages: string[];
      media_type: string;
      name: string;
      narrators: {
        name: string;
      }[];
      publisher: string;
      type: string;
      uri: string;
      total_chapters: number;
      chapters: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          audio_preview_url: string | null;
          available_markets: string[];
          chapter_number: number;
          description: string;
          html_description: string;
          duration_ms: number;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          is_playable: boolean;
          languages: string[];
          name: string;
          release_date: string;
          release_date_precision: string;
          resume_point: {
            fully_played: boolean;
            resume_position_ms: number;
          };
          type: string;
          uri: string;
          restrictions?: {
            reason: string;
          };
        }[];
      };
    };
    getSeveralAudiobooks: {
      audiobooks: [
        {
          authors: [
            {
              name: 'string';
            },
          ];
          available_markets: ['string'];
          copyrights: [
            {
              text: 'string';
              type: 'string';
            },
          ];
          description: 'string';
          html_description: 'string';
          edition: 'Unabridged';
          explicit: false;
          external_urls: {
            spotify: 'string';
          };
          href: 'string';
          id: 'string';
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228';
              height: 300;
              width: 300;
            },
          ];
          languages: ['string'];
          media_type: 'string';
          name: 'string';
          narrators: [
            {
              name: 'string';
            },
          ];
          publisher: 'string';
          type: 'audiobook';
          uri: 'string';
          total_chapters: 0;
          chapters: {
            href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20';
            limit: 20;
            next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
            offset: 0;
            previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1';
            total: 4;
            items: [
              {
                audio_preview_url: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17';
                available_markets: ['string'];
                chapter_number: 1;
                description: 'We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.';
                html_description: '<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>';
                duration_ms: 1686230;
                explicit: false;
                external_urls: {
                  spotify: 'string';
                };
                href: 'https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ';
                id: '5Xt5DXGzch68nYYamXrNxZ';
                images: [
                  {
                    url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228';
                    height: 300;
                    width: 300;
                  },
                ];
                is_playable: false;
                languages: ['fr', 'en'];
                name: 'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators';
                release_date: '1981-12-15';
                release_date_precision: 'day';
                resume_point: {
                  fully_played: false;
                  resume_position_ms: 0;
                };
                type: 'episode';
                uri: 'spotify:episode:0zLhl3WsOCQHbe1BPTiHgr';
                restrictions: {
                  reason: 'string';
                };
              },
            ];
          };
        },
      ];
    };
    getAudiobookChapters: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        audio_preview_url: string | null;
        available_markets: string[];
        chapter_number: number;
        description: string;
        html_description: string;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        is_playable: boolean;
        languages: string[];
        name: string;
        release_date: string;
        release_date_precision: string;
        resume_point: {
          fully_played: boolean;
          resume_position_ms: number;
        };
        type: string;
        uri: string;
        restrictions?: {
          reason: string;
        };
      }[];
    };
    getUsersSavedAudiobooks: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        authors: {
          name: string;
        }[];
        available_markets: string[];
        copyrights: {
          text: string;
          type: string;
        }[];
        description: string;
        html_description: string;
        edition: string;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        languages: string[];
        media_type: string;
        name: string;
        narrators: {
          name: string;
        }[];
        publisher: string;
        type: string;
        uri: string;
        total_chapters: number;
      }[];
    };
    saveAudiobooksForCurrentUser: unknown;
    removeUsersSavedAudiobooks: unknown;
    checkUsersSavedAudiobooks: boolean[];
  };
  categories: {
    getSeveralBrowseCategories: {
      categories: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          href: string;
          icons: {
            url: string;
            height: number;
            width: number;
          }[];
          id: string;
          name: string;
        }[];
      };
    };
    getSingleBrowseCategory: {
      href: string;
      icons: {
        url: string;
        height: number;
        width: number;
      }[];
      id: string;
      name: string;
    };
  };
  chapters: {
    getAChapter: {
      audio_preview_url: string | null;
      available_markets: string[];
      chapter_number: number;
      description: string;
      html_description: string;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      is_playable: boolean;
      languages: string[];
      name: string;
      release_date: string;
      release_date_precision: string;
      resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
      };
      type: string;
      uri: string;
      restrictions?: {
        reason: string;
      };
      audiobook: {
        authors: {
          name: string;
        }[];
        available_markets: string[];
        copyrights: {
          text: string;
          type: string;
        }[];
        description: string;
        html_description: string;
        edition: string;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        languages: string[];
        media_type: string;
        name: string;
        narrators: {
          name: string;
        }[];
        publisher: string;
        type: string;
        uri: string;
        total_chapters: number;
      };
    };
    getSeveralChapters: {
      chapters: {
        audio_preview_url: string | null;
        available_markets: string[];
        chapter_number: number;
        description: string;
        html_description: string;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        is_playable: boolean;
        languages: string[];
        name: string;
        release_date: string;
        release_date_precision: string;
        resume_point: {
          fully_played: boolean;
          resume_position_ms: number;
        };
        type: string;
        uri: string;
        restrictions?: {
          reason: string;
        };
        audiobook: {
          authors: {
            name: string;
          }[];
          available_markets: string[];
          copyrights: {
            text: string;
            type: string;
          }[];
          description: string;
          html_description: string;
          edition: string;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          languages: string[];
          media_type: string;
          name: string;
          narrators: {
            name: string;
          }[];
          publisher: string;
          type: string;
          uri: string;
          total_chapters: number;
        };
      }[];
    };
  };
  episodes: {
    getEpisode: {
      audio_preview_url: string | null;
      description: string;
      html_description: string;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      is_externally_hosted: boolean;
      is_playable: boolean;
      language: string;
      languages: string[];
      name: string;
      release_date: string;
      release_date_precision: string;
      resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
      };
      type: string;
      uri: string;
      restrictions?: {
        reason: string;
      };
      show: {
        available_markets: string[];
        copyrights: {
          text: string;
          type: string;
        }[];
        description: string;
        html_description: string;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        is_externally_hosted: boolean;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: string;
        uri: string;
        total_episodes: number;
      };
    };
    getSeveralEpisodes: {
      episodes: {
        audio_preview_url: string | null;
        description: string;
        html_description: string;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
        is_externally_hosted: boolean;
        is_playable: boolean;
        language: string;
        languages: string[];
        name: string;
        release_date: string;
        release_date_precision: string;
        resume_point: {
          fully_played: boolean;
          resume_position_ms: number;
        };
        type: string;
        uri: string;
        restrictions?: {
          reason: string;
        };
        show: {
          available_markets: string[];
          copyrights: {
            text: string;
            type: string;
          }[];
          description: string;
          html_description: string;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          is_externally_hosted: boolean;
          languages: string[];
          media_type: string;
          name: string;
          publisher: string;
          type: string;
          uri: string;
          total_episodes: number;
        };
      }[];
    };
    getUsersSavedEpisodes: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        added_at: string;
        episode: {
          audio_preview_url: string | null;
          description: string;
          html_description: string;
          duration_ms: number;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          is_externally_hosted: boolean;
          is_playable: boolean;
          language: string;
          languages: string[];
          name: string;
          release_date: string;
          release_date_precision: string;
          resume_point: {
            fully_played: boolean;
            resume_position_ms: number;
          };
          type: string;
          uri: string;
          restrictions?: {
            reason: string;
          };
          show: {
            available_markets: string[];
            copyrights: {
              text: string;
              type: string;
            }[];
            description: string;
            html_description: string;
            explicit: boolean;
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            images: {
              url: string;
              height: number;
              width: number;
            }[];
            is_externally_hosted: boolean;
            languages: string[];
            media_type: string;
            name: string;
            publisher: string;
            type: string;
            uri: string;
            total_episodes: number;
          };
        };
      }[];
    };
    saveEpisodesForCurrentUser: unknown;
    removeUsersSavedEpisodes: unknown;
    checkUsersSavedEpisodes: boolean[];
  };
  //   genres: {
  //     getAvailableGenreSeeds: () => {},
  //   },
  markets: {
    getAvailableMarkets: {
      markets: keyof (typeof iso.market)[];
    };
  };
  player: {
    getPlaybackState: {
      device: {
        id: string | null;
        is_active: boolean;
        is_private_session: boolean;
        is_restricted: boolean;
        name: string;
        type: string;
        volume_percent: number | null;
        supports_volume: boolean;
      };
      repeat_state: string;
      shuffle_state: boolean;
      context: {
        type: string;
        href: string | null;
        external_urls: {
          spotify: string;
        };
        uri: string;
      } | null;
      timestamp: number;
      progress_ms: number | null;
      is_playing: boolean;
      item: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc?: string;
          ean?: string;
          upc?: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: {
          external_urls?: {
            spotify: string;
          };
          href?: string;
          id?: string;
          type?: string;
          uri?: string;
        };
        restrictions?: {
          reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string | null;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      } | null;
      currently_playing_type: string;
      actions: {
        interrupting_playback: boolean;
        pausing: boolean;
        resuming: boolean;
        seeking: boolean;
        skipping_next: boolean;
        skipping_prev: boolean;
        toggling_repeat_context: boolean;
        toggling_shuffle: boolean;
        toggling_repeat_track: boolean;
        transferring_playback: boolean;
      };
    };
    transferPlayback: unknown;
    getAvailableDevices: {
      devices: {
        id: string | null;
        is_active: boolean;
        is_private_session: boolean;
        is_restricted: boolean;
        name: string;
        type: string;
        volume_percent: number | null;
        supports_volume: boolean;
      }[];
    };
    getCurrentlyPlayingTrack: {
      device: {
        id: string | null;
        is_active: boolean;
        is_private_session: boolean;
        is_restricted: boolean;
        name: string;
        type: string;
        volume_percent: number | null;
        supports_volume: boolean;
      };
      repeat_state: string;
      shuffle_state: boolean;
      context: {
        type: string | null;
        href: string | null;
        external_urls: {
          spotify: string;
        };
        uri: string | null;
      } | null;
      timestamp: number;
      progress_ms: number | null;
      is_playing: boolean;
      item: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        };
        artists: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
          ean?: string;
          upc?: string;
        };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: {};
        restrictions?: { reason: string };
        name: string;
        popularity: number;
        preview_url?: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      } | null;
      currently_playing_type: string;
      actions: {
        interrupting_playback: boolean;
        pausing: boolean;
        resuming: boolean;
        seeking: boolean;
        skipping_next: boolean;
        skipping_prev: boolean;
        toggling_repeat_context: boolean;
        toggling_shuffle: boolean;
        toggling_repeat_track: boolean;
        transferring_playback: boolean;
      };
    };
    startOrResumePlayback: unknown;
    pausePlayback: unknown;
    skipToNext: unknown;
    skipToPrevious: unknown;
    seekToPosition: unknown;
    setRepeatMode: unknown;
    setPlaybackVolume: unknown;
    togglePlaybackShuffle: unknown;
    getRecentlyPlayedTracks: {
      href: string;
      limit: number;
      next: string | null;
      cursors: {
        after: string | null;
        before: string | null;
      };
      total: number;
      items: {
        track: {
          album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: { spotify: string };
            href: string;
            id: string;
            images: { url: string; height: number; width: number }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?: { reason: string };
            type: string;
            uri: string;
            artists: {
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }[];
          };
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_ids: {
            isrc: string;
            ean?: string;
            upc?: string;
          };
          external_urls: { spotify: string };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from?: {};
          restrictions?: { reason: string };
          name: string;
          popularity: number;
          preview_url?: string;
          track_number: number;
          type: string;
          uri: string;
          is_local: boolean;
        };
        played_at: string;
        context: {
          type: string | null;
          href: string | null;
          external_urls: { spotify: string };
          uri: string | null;
        } | null;
      }[];
    };
    getTheUsersQueue: {
      currently_playing: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: { reason: string };
          type: string;
          uri: string;
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        };
        artists: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: { isrc: string; ean?: string; upc?: string };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: {};
        restrictions?: { reason: string };
        name: string;
        popularity: number;
        preview_url?: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      };
      queue: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: { reason: string };
          type: string;
          uri: string;
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
        };
        artists: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: { isrc: string; ean?: string; upc?: string };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: {};
        restrictions?: { reason: string };
        name: string;
        popularity: number;
        preview_url?: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      }[];
    };
    addItemsToPlaybackQueue: unknown;
  };
  playlists: {
    getPlaylist: {
      collaborative: boolean;
      description: string;
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      name: string;
      owner: {
        external_urls: { spotify: string };
        href: string;
        id: string;
        type: 'user';
        uri: string;
        display_name: string;
      };
      public: boolean;
      snapshot_id: string;
      tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          added_at: string;
          added_by: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            type: 'user';
            uri: string;
          };
          is_local: boolean;
          track: {
            album: {
              album_type: string;
              total_tracks: number;
              available_markets: string[];
              external_urls: { spotify: string };
              href: string;
              id: string;
              images: { url: string; height: number; width: number }[];
              name: string;
              release_date: string;
              release_date_precision: string;
              restrictions?: { reason: string };
              type: string;
              uri: string;
              artists: {
                external_urls: { spotify: string };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
              }[];
            };
            artists: {
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }[];
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit: boolean;
            external_ids: { isrc: string; ean?: string; upc?: string };
            external_urls: { spotify: string };
            href: string;
            id: string;
            is_playable: boolean;
            linked_from?: {};
            restrictions?: { reason: string };
            name: string;
            popularity: number;
            preview_url?: string;
            track_number: number;
            type: string;
            uri: string;
            is_local: boolean;
          };
        }[];
      };
      type: string;
      uri: string;
    };
    changePlaylistDetails: unknown;
    getPlaylistItems: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        added_at: string;
        added_by: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          type: 'user';
          uri: string;
        };
        is_local: boolean;
        track: {
          album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: { spotify: string };
            href: string;
            id: string;
            images: { url: string; height: number; width: number }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?: { reason: string };
            type: string;
            uri: string;
            artists: {
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }[];
          };
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_ids: { isrc: string; ean?: string; upc?: string };
          external_urls: { spotify: string };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from?: {};
          restrictions?: { reason: string };
          name: string;
          popularity: number;
          preview_url?: string;
          track_number: number;
          type: string;
          uri: string;
          is_local: boolean;
        };
      }[];
    };
    updatePlaylistItems: {
      snapshot_id: string;
    };
    addItemsToPlaylist: {
      snapshot_id: string;
    };
    removePlaylistItems: {
      snapshot_id: string;
    };
    getCurrentUsersPlaylists: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        collaborative: boolean;
        description: string;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        name: string;
        owner: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          type: string;
          uri: string;
          display_name: string;
        };
        public: boolean;
        snapshot_id: string;
        tracks: { href: string; total: number };
        type: string;
        uri: string;
      }[];
    };
    getUsersPlaylists: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: Array<{
        collaborative: boolean;
        description: string;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: Array<{ url: string; height: number; width: number }>;
        name: string;
        owner: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          type: string;
          uri: string;
          display_name: string;
        };
        public: boolean;
        snapshot_id: string;
        tracks: { href: string; total: number };
        type: string;
        uri: string;
      }>;
    };
    createPlaylist: {
      collaborative: boolean;
      description: string;
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: Array<{ url: string; height: number; width: number }>;
      name: string;
      owner: {
        external_urls: { spotify: string };
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string;
      };
      public: boolean;
      snapshot_id: string;
      tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: Array<{
          added_at: string;
          added_by: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            type: string;
            uri: string;
          };
          is_local: boolean;
          track: {
            album: {
              album_type: string;
              total_tracks: number;
              available_markets: string[];
              external_urls: { spotify: string };
              href: string;
              id: string;
              images: Array<{ url: string; height: number; width: number }>;
              name: string;
              release_date: string;
              release_date_precision: string;
              restrictions?: { reason: string };
              type: string;
              uri: string;
              artists: Array<{
                external_urls: { spotify: string };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
              }>;
            };
            artists: Array<{
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }>;
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit: boolean;
            external_ids: { isrc: string; ean: string; upc: string };
            external_urls: { spotify: string };
            href: string;
            id: string;
            is_playable: boolean;
            linked_from?: Record<string, unknown>;
            restrictions?: { reason: string };
            name: string;
            popularity: number;
            preview_url: string;
            track_number: number;
            type: string;
            uri: string;
            is_local: boolean;
          };
        }>;
      };
      type: string;
      uri: string;
    };
    // getFeaturedPlaylists: () => {},
    // getCategorysPlaylists: () => {},
    getPlaylistCoverImage: {
      url: string;
      height: number;
      width: number;
    }[];
    addCustomPlaylistCoverImage: unknown;
  };
  search: {
    searchForItem: {
      tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: { spotify: string };
            href: string;
            id: string;
            images: { url: string; height: number; width: number }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?: { reason: string };
            type: 'album';
            uri: string;
            artists: {
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: 'artist';
              uri: string;
            }[];
          };
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: 'artist';
            uri: string;
          }[];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_ids: { isrc: string; ean?: string; upc?: string };
          external_urls: { spotify: string };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from?: Record<string, unknown>;
          restrictions?: { reason: string };
          name: string;
          popularity: number;
          preview_url: string | null;
          track_number: number;
          type: 'track';
          uri: string;
          is_local: boolean;
        }[];
      };
      artists: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          external_urls: { spotify: string };
          followers: { href: string | null; total: number };
          genres: string[];
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          popularity: number;
          type: 'artist';
          uri: string;
        }[];
      };
      albums: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: { reason: string };
          type: 'album';
          uri: string;
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: 'artist';
            uri: string;
          }[];
        }[];
      };
      playlists: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          collaborative: boolean;
          description: string;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          owner: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            type: 'user';
            uri: string;
            display_name: string;
          };
          public: boolean;
          snapshot_id: string;
          tracks: { href: string; total: number };
          type: 'playlist';
          uri: string;
        }[];
      };
      shows: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          available_markets: string[];
          copyrights: { text: string; type: string }[];
          description: string;
          html_description: string;
          explicit: boolean;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          is_externally_hosted: boolean;
          languages: string[];
          media_type: string;
          name: string;
          publisher: string;
          type: 'show';
          uri: string;
          total_episodes: number;
        }[];
      };
      episodes: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          audio_preview_url: string | null;
          description: string;
          html_description: string;
          duration_ms: number;
          explicit: boolean;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          is_externally_hosted: boolean;
          is_playable: boolean;
          language: string;
          languages: string[];
          name: string;
          release_date: string;
          release_date_precision: string;
          resume_point: { fully_played: boolean; resume_position_ms: number };
          type: 'episode';
          uri: string;
          restrictions?: { reason: string };
        }[];
      };
      audiobooks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          authors: { name: string }[];
          available_markets: string[];
          copyrights: { text: string; type: string }[];
          description: string;
          html_description: string;
          edition: string;
          explicit: boolean;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          languages: string[];
          media_type: string;
          name: string;
          narrators: { name: string }[];
          publisher: string;
          type: 'audiobook';
          uri: string;
          total_chapters: number;
        }[];
      };
    };
  };
  shows: {
    getShow: {
      available_markets: string[];
      copyrights: { text: string; type: string }[];
      description: string;
      html_description: string;
      explicit: boolean;
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      is_externally_hosted: boolean;
      languages: string[];
      media_type: string;
      name: string;
      publisher: string;
      type: 'show';
      uri: string;
      total_episodes: number;
      episodes: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
          audio_preview_url: string | null;
          description: string;
          html_description: string;
          duration_ms: number;
          explicit: boolean;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          is_externally_hosted: boolean;
          is_playable: boolean;
          language: string;
          languages: string[];
          name: string;
          release_date: string;
          release_date_precision: string;
          resume_point: { fully_played: boolean; resume_position_ms: number };
          type: 'episode';
          uri: string;
          restrictions?: { reason: string };
        }[];
      };
    };
    getSeveralShows: {
      shows: {
        available_markets: string[];
        copyrights: { text: string; type: string }[];
        description: string;
        html_description: string;
        explicit: boolean;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        is_externally_hosted: boolean;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: 'show';
        uri: string;
        total_episodes: number;
      }[];
    };
    getShowEpisodes: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        audio_preview_url: string;
        description: string;
        html_description: string;
        duration_ms: number;
        explicit: boolean;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        is_externally_hosted: boolean;
        is_playable: boolean;
        language: string;
        languages: string[];
        name: string;
        release_date: string;
        release_date_precision: 'year' | 'month' | 'day';
        resume_point: { fully_played: boolean; resume_position_ms: number };
        type: 'episode';
        uri: string;
        restrictions: { reason: string };
      }[];
    };
    getUsersSavedShows: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        added_at: string;
        show: {
          available_markets: string[];
          copyrights: { text: string; type: string }[];
          description: string;
          html_description: string;
          explicit: boolean;
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          is_externally_hosted: boolean;
          languages: string[];
          media_type: string;
          name: string;
          publisher: string;
          type: 'show';
          uri: string;
          total_episodes: number;
        };
      }[];
    };
    saveShowsForCurrentUser: unknown;
    removeUsersSavedShows: unknown;
    checkUsersSavedShows: boolean[];
  };
  tracks: {
    getTrack: {
      album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions?: { reason: string };
        type: 'album';
        uri: string;
        artists: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: 'artist';
          uri: string;
        }[];
      };
      artists: {
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: 'artist';
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: { isrc: string; ean: string; upc: string };
      external_urls: { spotify: string };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from?: Record<string, unknown>;
      restrictions?: { reason: string };
      name: string;
      popularity: number;
      preview_url: string | null;
      track_number: number;
      type: 'track';
      uri: string;
      is_local: boolean;
    };
    getSeveralTracks: {
      tracks: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: { spotify: string };
          href: string;
          id: string;
          images: { url: string; height: number; width: number }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions?: { reason: string };
          type: 'album';
          uri: string;
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: 'artist';
            uri: string;
          }[];
        };
        artists: {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: 'artist';
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: { isrc: string; ean: string; upc: string };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: Record<string, unknown>;
        restrictions?: { reason: string };
        name: string;
        popularity: number;
        preview_url: string | null;
        track_number: number;
        type: 'track';
        uri: string;
        is_local: boolean;
      }[];
    };
    getUsersSavedTracks: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        added_at: string;
        track: {
          album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: { spotify: string };
            href: string;
            id: string;
            images: { url: string; height: number; width: number }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?: { reason: string };
            type: 'album';
            uri: string;
            artists: {
              external_urls: { spotify: string };
              href: string;
              id: string;
              name: string;
              type: 'artist';
              uri: string;
            }[];
          };
          artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: 'artist';
            uri: string;
          }[];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_ids: { isrc: string; ean: string; upc: string };
          external_urls: { spotify: string };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from?: Record<string, unknown>;
          restrictions?: { reason: string };
          name: string;
          popularity: number;
          preview_url: string | null;
          track_number: number;
          type: 'track';
          uri: string;
          is_local: boolean;
        };
      }[];
    };
    saveTracksForCurrentUser: unknown;
    removeUsersSavedTracks: unknown;
    checkUsersSavedTracks: boolean[];
    // getSeveralTracksAudioFeatures: () => {},
    // getTracksAudioFeatures: () => {},
    // getTracksAudioAnalysis: () => {},
    // getRecommendations: () => {},
  };
  users: {
    getCurrentUsersProfile: {
      country: string;
      display_name: string;
      email: string;
      explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
      };
      external_urls: { spotify: string };
      followers: { href: string | null; total: number };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      product: string;
      type: string;
      uri: string;
    };
    getUsersTopItems: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: {
        external_urls: { spotify: string };
        followers: { href: string | null; total: number };
        genres: string[];
        href: string;
        id: string;
        images: { url: string; height: number; width: number }[];
        name: string;
        popularity: number;
        type: 'artist';
        uri: string;
      }[];
    };
    getUsersProfile: {
      display_name: string;
      external_urls: { spotify: string };
      followers: { href: string | null; total: number };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      type: 'user';
      uri: string;
    };
    followPlaylist: unknown;
    unfollowPlaylist: unknown;
    getFollowedArtists: {
      artists: {
        href: string;
        limit: number;
        next: string;
        cursors: {
          after: string;
          before: string;
        };
        total: number;
        items: {
          external_urls: {
            spotify: string;
          };
          followers: {
            href: string;
            total: number;
          };
          genres: string[];
          href: string;
          id: string;
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          name: string;
          popularity: number;
          type: 'artist';
          uri: string;
        }[];
      };
    };
    followArtistsOrUsers: unknown;
    unfollowArtistsOrUsers: unknown;
    checkIfUserFollowsArtistsOrUsers: boolean[];
    checkIfCurrentUserFollowsPlaylist: boolean[];
  };
};

export function callSpotify(request: keyof typeof flatEndpoints) {}

// https://developer.spotify.com/documentation/web-api
type Response = {
  albums: {
    getAlbum: {};
    getSeveralAlbums: {};
    getAlbumTracks: {};
    getUsersSavedAlbums: {};
    saveAlbumsForCurrentUser: {};
    removeUsersSavedAlbums: {};
    checkUsersSavedAlbums: {};
    getNewReleases: {};
  };
  artists: {
    getArtist: {};
    getSeveralArtists: {};
    getArtistsAlbums: {};
    getArtistsTopTracks: {};
    // getArtistsRelatedTracks: () => {},
  };
  audiobooks: {
    getAnAudiobook: {};
    getSeveralAudiobooks: {};
    getAudiobookChapters: {};
    getUsersSavedAudiobooks: {};
    saveAudiobooksForCurrentUser: {};
    removeUsersSavedAudiobooks: {};
    checkUsersSavedAudiobooks: {};
  };
  categories: {
    getSeveralBrowseCategories: {};
    getSingleBrowseCategory: {};
  };
  chapters: {
    getAChapter: {};
    getSeveralChapters: {};
  };
  episodes: {
    getEpisode: {};
    getSeveralEpisodes: {};
    getUsersSavedEpisodes: {};
    saveEpisodesForCurrentUser: {};
    removeUsersSavedEpisodes: {};
    checkUsersSavedEpisodes: {};
  };
  //   genres: {
  //     getAvailableGenreSeeds: () => {},
  //   },
  markets: {
    getAvailableMarkets: {};
  };
  player: {
    getPlaybackState: {};
    transferPlayback: {};
    getAvailableDevices: {};
    getCurrentlyPlayingTrack: {};
    startOrResumePlayback: {};
    pausePlayback: {};
    skipToNext: {};
    skipToPrevious: {};
    seekToPosition: {};
    setRepeatMode: {};
    setPlaybackVolume: {};
    togglePlaybackShuffle: {};
    getRecentlyPlayedTracks: {};
    getTheUsersQueue: {};
    addItemsToPlaybackQueue: {};
  };
  playlists: {
    getPlaylist: {};
    changePlaylistDetails: {};
    getPlaylistItems: {};
    updatePlaylistItems: {};
    addItemsToPlaylist: {};
    removePlaylistItems: {};
    getCurrentUsersPlaylists: {};
    getUsersPlaylists: {};
    createPlaylist: {};
    // getFeaturedPlaylists: () => {},
    // getCategorysPlaylists: () => {},
    getPlaylistCoverImage: {};
    addCustomPlaylistCoverImage: {};
  };
  search: {
    searchForItem: {};
  };
  shows: {
    getShow: {};
    getSeveralShows: {};
    getShowEpisodes: {};
    getUsersSavedShows: {};
    saveShowsForCurrentUser: {};
    removeUsersSavedShows: {};
    checkUsersSavedShows: {};
  };
  tracks: {
    getTrack: {};
    getSeveralTracks: {};
    getUsersSavedTracks: {};
    saveTracksForCurrentUser: {};
    removeUsersSavedTracks: {};
    checkUsersSavedTracks: {};
    // getSeveralTracksAudioFeatures: () => {},
    // getTracksAudioFeatures: () => {},
    // getTracksAudioAnalysis: () => {},
    // getRecommendations: () => {},
  };
  users: {
    getCurrentUsersProfile: {};
    getUsersTopItems: {};
    getUsersProfile: {};
    followPlaylist: {};
    unfollowPlaylist: {};
    getFollowedArtists: {};
    followArtistsOrUsers: {};
    unfollowArtistsOrUsers: {};
    checkIfUserFollowsArtistsOrUsers: {};
    checkIfCurrentUserFollowsPlaylist: {};
  };
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryArgs = Partial<{
  id: string;
  ids: number[];
  category_id: string;
  genres: string[];
  market: keyof typeof provider.market;
  markets: (keyof typeof provider.market)[];
  locale: keyof typeof provider.market;
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
}>;

type BodyArgs = {
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

const provider = {
  base: 'https://api.spotify.com/v1',
  marketBase: 'market=',
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  get market() {
    return {
      Afghanistan: `${this.marketBase}AF`,
      Albania: `${this.marketBase}AL`,
      Algeria: `${this.marketBase}DZ`,
      Andorra: `${this.marketBase}AD`,
      Angola: `${this.marketBase}AO`,
      Argentina: `${this.marketBase}AR`,
      Armenia: `${this.marketBase}AM`,
      Australia: `${this.marketBase}AU`,
      Austria: `${this.marketBase}AT`,
      Azerbaijan: `${this.marketBase}AZ`,
      Bahrain: `${this.marketBase}BH`,
      Bangladesh: `${this.marketBase}BD`,
      Belarus: `${this.marketBase}BY`,
      Belgium: `${this.marketBase}BE`,
      Belize: `${this.marketBase}BZ`,
      Benin: `${this.marketBase}BJ`,
      Bhutan: `${this.marketBase}BT`,
      Bolivia: `${this.marketBase}BO`,
      'Bosnia and Herzegovina': `${this.marketBase}BA`,
      Botswana: `${this.marketBase}BW`,
      Brazil: `${this.marketBase}BR`,
      Bulgaria: `${this.marketBase}BG`,
      'Burkina Faso': `${this.marketBase}BF`,
      Burundi: `${this.marketBase}BI`,
      Cambodia: `${this.marketBase}KH`,
      Cameroon: `${this.marketBase}CM`,
      Canada: `${this.marketBase}CA`,
      'Cape Verde': `${this.marketBase}CV`,
      'Central African Republic': `${this.marketBase}CF`,
      Chad: `${this.marketBase}TD`,
      Chile: `${this.marketBase}CL`,
      China: `${this.marketBase}CN`,
      Colombia: `${this.marketBase}CO`,
      Congo: `${this.marketBase}CG`,
      'Costa Rica': `${this.marketBase}CR`,
      'Côte d’Ivoire': `${this.marketBase}CI`,
      Croatia: `${this.marketBase}HR`,
      Cyprus: `${this.marketBase}CY`,
      'Czech Republic': `${this.marketBase}CZ`,
      Denmark: `${this.marketBase}DK`,
      Djibouti: `${this.marketBase}DJ`,
      'Dominican Republic': `${this.marketBase}DO`,
      Ecuador: `${this.marketBase}EC`,
      Egypt: `${this.marketBase}EG`,
      'El Salvador': `${this.marketBase}SV`,
      Estonia: `${this.marketBase}EE`,
      Ethiopia: `${this.marketBase}ET`,
      Fiji: `${this.marketBase}FJ`,
      Finland: `${this.marketBase}FI`,
      France: `${this.marketBase}FR`,
      Gabon: `${this.marketBase}GA`,
      Georgia: `${this.marketBase}GE`,
      Germany: `${this.marketBase}DE`,
      Ghana: `${this.marketBase}GH`,
      Greece: `${this.marketBase}GR`,
      Guatemala: `${this.marketBase}GT`,
      Guinea: `${this.marketBase}GN`,
      'Guinea-Bissau': `${this.marketBase}GW`,
      Honduras: `${this.marketBase}HN`,
      'Hong Kong': `${this.marketBase}HK`,
      Hungary: `${this.marketBase}HU`,
      Iceland: `${this.marketBase}IS`,
      India: `${this.marketBase}IN`,
      Indonesia: `${this.marketBase}ID`,
      Ireland: `${this.marketBase}IE`,
      Israel: `${this.marketBase}IL`,
      Italy: `${this.marketBase}IT`,
      Jamaica: `${this.marketBase}JM`,
      Japan: `${this.marketBase}JP`,
      Jordan: `${this.marketBase}JO`,
      Kazakhstan: `${this.marketBase}KZ`,
      Kenya: `${this.marketBase}KE`,
      Kuwait: `${this.marketBase}KW`,
      Kyrgyzstan: `${this.marketBase}KG`,
      Laos: `${this.marketBase}LA`,
      Latvia: `${this.marketBase}LV`,
      Lebanon: `${this.marketBase}LB`,
      Lesotho: `${this.marketBase}LS`,
      Liberia: `${this.marketBase}LR`,
      Libya: `${this.marketBase}LY`,
      Liechtenstein: `${this.marketBase}LI`,
      Lithuania: `${this.marketBase}LT`,
      Luxembourg: `${this.marketBase}LU`,
      Macau: `${this.marketBase}MO`,
      'North Macedonia': `${this.marketBase}MK`,
      Madagascar: `${this.marketBase}MG`,
      Malawi: `${this.marketBase}MW`,
      Malaysia: `${this.marketBase}MY`,
      Mali: `${this.marketBase}ML`,
      Malta: `${this.marketBase}MT`,
      Mauritania: `${this.marketBase}MR`,
      Mauritius: `${this.marketBase}MU`,
      Mexico: `${this.marketBase}MX`,
      Moldova: `${this.marketBase}MD`,
      Monaco: `${this.marketBase}MC`,
      Mongolia: `${this.marketBase}MN`,
      Montenegro: `${this.marketBase}ME`,
      Morocco: `${this.marketBase}MA`,
      Mozambique: `${this.marketBase}MZ`,
      Myanmar: `${this.marketBase}MM`,
      Namibia: `${this.marketBase}NA`,
      Nepal: `${this.marketBase}NP`,
      Netherlands: `${this.marketBase}NL`,
      'New Zealand': `${this.marketBase}NZ`,
      Nicaragua: `${this.marketBase}NI`,
      Niger: `${this.marketBase}NE`,
      Nigeria: `${this.marketBase}NG`,
      Norway: `${this.marketBase}NO`,
      Oman: `${this.marketBase}OM`,
      Pakistan: `${this.marketBase}PK`,
      Panama: `${this.marketBase}PA`,
      'Papua New Guinea': `${this.marketBase}PG`,
      Paraguay: `${this.marketBase}PY`,
      Peru: `${this.marketBase}PE`,
      Philippines: `${this.marketBase}PH`,
      Poland: `${this.marketBase}PL`,
      Portugal: `${this.marketBase}PT`,
      Qatar: `${this.marketBase}QA`,
      Romania: `${this.marketBase}RO`,
      Russia: `${this.marketBase}RU`,
      Rwanda: `${this.marketBase}RW`,
      'Saudi Arabia': `${this.marketBase}SA`,
      Senegal: `${this.marketBase}SN`,
      Serbia: `${this.marketBase}RS`,
      Singapore: `${this.marketBase}SG`,
      Slovakia: `${this.marketBase}SK`,
      Slovenia: `${this.marketBase}SI`,
      'South Africa': `${this.marketBase}ZA`,
      'South Korea': `${this.marketBase}KR`,
      Spain: `${this.marketBase}ES`,
      'Sri Lanka': `${this.marketBase}LK`,
      Sweden: `${this.marketBase}SE`,
      Switzerland: `${this.marketBase}CH`,
      Taiwan: `${this.marketBase}TW`,
      Tanzania: `${this.marketBase}TZ`,
      Thailand: `${this.marketBase}TH`,
      Tunisia: `${this.marketBase}TN`,
      Turkey: `${this.marketBase}TR`,
      Ukraine: `${this.marketBase}UA`,
      'United Arab Emirates': `${this.marketBase}AE`,
      'United Kingdom': `${this.marketBase}GB`,
      USA: `${this.marketBase}US`,
      Uruguay: `${this.marketBase}UY`,
      Venezuela: `${this.marketBase}VE`,
      Vietnam: `${this.marketBase}VN`,
      Zambia: `${this.marketBase}ZM`,
      Zimbabwe: `${this.marketBase}ZW`,
    };
  },
  defaultLimit: 50, // spotify default: 20
};

const endpoints = {
  albums: {
    getAlbum: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/albums/{id}'
    ): string => '',
    getSeveralAlbums: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/albums'
    ): string => '',
    getAlbumTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/albums/{id}/tracks'
    ): string => '',
    getUsersSavedAlbums: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'offset' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/me/albums'
    ): string => '',
    saveAlbumsForCurrentUser: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<BodyArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/albums'
    ): string => '',
    removeUsersSavedAlbums: (
      method: Method = 'DELETE',
      args: undefined,
      body: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/albums'
    ): string => '',
    checkUsersSavedAlbums: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/albums/contains'
    ): string => '',
    getNewReleases: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/browse/new-releases'
    ): string => '',
  },
  artists: {
    getArtist: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id'>,
      endpoint = 'https://api.spotify.com/v1/artists/{id}'
    ): string => '',
    getSeveralArtists: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/artists'
    ): string => '',
    getArtistsAlbums: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'include_groups' | 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/artists/{id}/albums'
    ): string => '',
    getArtistsTopTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/artists/{id}/top-tracks'
    ): string => '',
    // getArtistsRelatedTracks
  },
  audiobooks: {
    getAnAudiobook: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/audiobooks/{id}'
    ): string => '',
    getSeveralAudiobooks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/audiobooks'
    ): string => '',
    getAudiobookChapters: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/audiobooks/{id}/chapters'
    ): string => '',
    getUsersSavedAudiobooks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/audiobooks'
    ): string => '',
    saveAudiobooksForCurrentUser: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/audiobooks'
    ): string => '',
    removeUsersSavedAudiobooks: (
      method: Method = 'DELETE',
      args = undefined,
      body: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/audiobooks'
    ): string => '',
    checkUsersSavedAudiobooks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/audiobooks/contains'
    ): string => '',
  },
  categories: {
    getSeveralBrowseCategories: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'locale' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/browse/categories'
    ): string => '',
    getSingleBrowseCategory: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'category_id' | 'locale'>,
      endpoint = 'https://api.spotify.com/v1/browse/categories/{category_id}'
    ): string => '',
  },
  chapters: {
    getAChapter: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/chapters/{id}'
    ): string => '',
    getSeveralChapters: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/chapters'
    ): string => '',
  },
  episodes: {
    getEpisode: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/episodes/{id}'
    ): string => '',
    getSeveralEpisodes: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/episodes'
    ): string => '',
    getUsersSavedEpisodes: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/episodes'
    ): string => '',
    saveEpisodesForCurrentUser: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/episodes'
    ): string => '',
    removeUsersSavedEpisodes: (
      method: Method = 'DELETE',
      args = undefined,
      body: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/episodes'
    ): string => '',
    checkUsersSavedEpisodes: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/episodes/contains'
    ): string => '',
  },
  //   genres: {
  //     getAvailableGenreSeeds
  //   },
  markets: {
    getAvailableMarkets: (method: Method = 'GET', endpoint = 'https://api.spotify.com/v1/markets'): string => '',
  },
  player: {
    getPlaybackState: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'additional_types'>,
      endpoint = 'https://api.spotify.com/v1/me/player'
    ): string => '',
    transferPlayback: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'device_ids' | 'play'>,
      endpoint = 'https://api.spotify.com/v1/me/player'
    ): string => '',
    getAvailableDevices: (method: Method = 'GET', endpoint = 'https://api.spotify.com/v1/me/player/devices'): string =>
      '',
    getCurrentlyPlayingTrack: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'additional_types'>,
      endpoint = 'https://api.spotify.com/v1/me/player/currently-playing'
    ): string => '',
    startOrResumePlayback: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/play'
    ): string => '',
    pausePlayback: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/pause'
    ): string => '',
    skipToNext: (
      method: Method = 'POST',
      args = undefined,
      body: Pick<QueryArgs, 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/next'
    ): string => '',
    skipToPrevious: (
      method: Method = 'POST',
      args = undefined,
      body: Pick<QueryArgs, 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/previous'
    ): string => '',
    seekToPosition: (
      method: Method = 'POST',
      args = undefined,
      body: Pick<QueryArgs, 'position_ms' | 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/seek'
    ): string => '',
    setRepeatMode: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'state' | 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/repeat'
    ): string => '',
    setPlaybackVolume: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'volume_percent' | 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/volume'
    ): string => '',
    togglePlaybackShuffle: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<QueryArgs, 'state' | 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/shuffle'
    ): string => '',
    getRecentlyPlayedTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'after' | 'before'>,
      endpoint = 'https://api.spotify.com/v1/me/player/recently-played'
    ): string => '',
    getTheUsersQueue: (
      method: Method = 'GET',
      args = undefined,
      endpoint = 'https://api.spotify.com/v1/me/player/queue'
    ): string => '',
    addItemsToPlaybackQueue: (
      method: Method = 'POST',
      args = undefined,
      body: Pick<QueryArgs, 'uri' | 'device_id'>,
      endpoint = 'https://api.spotify.com/v1/me/player/queue'
    ): string => '',
  },
  playlists: {
    getPlaylist: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'playlist_id' | 'market' | 'fields' | 'additional_types'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}'
    ): string => '',
    changePlaylistDetails: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'playlist_id'>,
      body: Pick<BodyArgs, 'name' | 'public' | 'collaborative' | 'description'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}'
    ): string => '',
    getPlaylistItems: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'playlist_id' | 'market' | 'fields' | 'limit' | 'offset' | 'additional_types'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    ): string => '',
    updatePlaylistItems: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'playlist_id' | 'uris'>,
      body: Pick<BodyArgs, 'uris' | 'range_start' | 'insert_before' | 'range_length' | 'snapshot_id'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    ): string => '',
    addItemsToPlaylist: (
      method: Method = 'POST',
      args: Pick<QueryArgs, 'playlist_id'>,
      body: Pick<BodyArgs, 'position' | 'uris'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    ): string => '',
    removePlaylistItems: (
      method: Method = 'DELETE',
      args: Pick<QueryArgs, 'playlist_id'>,
      body: Pick<BodyArgs, 'tracks' | 'uri' | 'snapshot_id'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    ): string => '',
    getCurrentUsersPlaylists: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/playlists'
    ): string => '',
    getUsersPlaylists: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'user_id' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/users/{user_id}/playlists'
    ): string => '',
    createPlaylist: (
      method: Method = 'POST',
      args: Pick<QueryArgs, 'user_id'>,
      body: Pick<BodyArgs, 'name' | 'public' | 'collaborative' | 'description'>,
      endpoint = 'https://api.spotify.com/v1/users/{user_id}/playlists'
    ): string => '',
    // getFeaturedPlaylists
    // getCategorysPlaylists
    getPlaylistCoverImage: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'playlist_id'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/images'
    ): string => '',
    addCustomPlaylistCoverImage: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'playlist_id'>,
      body = undefined,
      endpoint = 'https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/images'
    ): string => '',
  },
  search: {
    searchForItem: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'q' | 'type' | 'market' | 'limit' | 'offset' | 'include_external'>,
      endpoint = 'https://api.spotify.com/v1/search'
    ): string => '',
  },
  shows: {
    getShow: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'id'>,
      endpoint = 'https://api.spotify.com/v1/shows/{id}'
    ): string => '',
    getSeveralShows: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'ids'>,
      endpoint = 'https://api.spotify.com/v1/shows'
    ): string => '',
    getShowEpisodes: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/shows/{id}/episodes'
    ): string => '',
    getUsersSavedShows: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/shows'
    ): string => '',
    saveShowsForCurrentUser: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'ids'>,
      body = undefined,
      endpoint = 'https://api.spotify.com/v1/me/shows'
    ): string => '',
    removeUsersSavedShows: (
      method: Method = 'DELETE',
      args: Pick<QueryArgs, 'ids' | 'market'>,
      body = undefined,
      endpoint = 'https://api.spotify.com/v1/me/shows'
    ): string => '',
    checkUsersSavedShows: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/shows/contains'
    ): string => '',
  },
  tracks: {
    getTrack: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'id' | 'market'>,
      endpoint = 'https://api.spotify.com/v1/tracks/{id}'
    ): string => '',
    getSeveralTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'ids'>,
      endpoint = 'https://api.spotify.com/v1/tracks'
    ): string => '',
    getUsersSavedTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'market' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/tracks'
    ): string => '',
    saveTracksForCurrentUser: (
      method: Method = 'PUT',
      args = undefined,
      body: Pick<BodyArgs, 'ids' | 'timestamped_ids'>,
      endpoint = 'https://api.spotify.com/v1/me/tracks'
    ): string => '',
    removeUsersSavedTracks: (
      method: Method = 'DELETE',
      args = undefined,
      body: Pick<BodyArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/tracks'
    ): string => '',
    checkUsersSavedTracks: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/tracks/contains'
    ): string => '',
    // getSeveralTracksAudioFeatures
    // getTracksAudioFeatures
    // getTracksAudioAnalysis
    // getRecommendations
  },
  users: {
    getCurrentUsersProfile: (
      method: Method = 'GET',
      args = undefined,
      endpoint = 'https://api.spotify.com/v1/me'
    ): string => '',
    getUsersTopItems: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'type' | 'time_range' | 'limit' | 'offset'>,
      endpoint = 'https://api.spotify.com/v1/me/top/{type}'
    ): string => '',
    getUsersProfile: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'user_id'>,
      endpoint = 'https://api.spotify.com/v1/users/{user_id}'
    ): string => '',
    followPlaylist: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'playlist_id'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/followers'
    ): string => '',
    unfollowPlaylist: (
      method: Method = 'DELETE',
      args: Pick<QueryArgs, 'playlist_id'>,
      body = undefined,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/followers'
    ): string => '',
    getFollowedArtists: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'type' | 'after' | 'limit'>,
      endpoint = 'https://api.spotify.com/v1/me/following'
    ): string => '',
    followArtistsOrUsers: (
      method: Method = 'PUT',
      args: Pick<QueryArgs, 'type' | 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/following'
    ): string => '',
    unfollowArtistsOrUsers: (
      method: Method = 'DELETE',
      args: Pick<QueryArgs, 'type' | 'ids'>,
      body: Pick<BodyArgs, 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/following'
    ): string => '',
    checkIfUserFollowsArtistsOrUsers: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'type' | 'ids'>,
      endpoint = 'https://api.spotify.com/v1/me/following/contains'
    ): string => '',
    checkIfCurrentUserFollowsPlaylist: (
      method: Method = 'GET',
      args: Pick<QueryArgs, 'playlist_id'>,
      endpoint = 'https://api.spotify.com/v1/playlists/{playlist_id}/followers/contains'
    ): string => '',
  },
} as const;

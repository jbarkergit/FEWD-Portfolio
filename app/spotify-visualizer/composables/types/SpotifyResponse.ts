import type { iso } from '~/base/const/iso';

// Shared base types
type ExternalUrls = { spotify: string };
type Image = { url: string; height: number; width: number };
type Restrictions = { reason: string };
type Followers = { href: string | null; total: number };
type Copyrights = { text: string; type: string };
type ExternalIds = { isrc: string; ean?: string; upc?: string };
type ResumePoint = { fully_played: boolean; resume_position_ms: number };

type PaginationBase = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

// Artist types
type SimplifiedArtist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type FullArtist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

// Album types
type SimplifiedAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
};

type SimplifiedTrackObject = {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  restrictions?: Restrictions;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

type FullAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
  tracks: PaginationBase & { items: SimplifiedTrackObject[] };
  copyrights: Copyrights[];
  external_ids: { isrc: string; ean: string; upc: string };
  genres: string[];
  label: string;
  popularity: number;
};

// Track types
type FullTrack = {
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: Record<string, unknown>;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

// Playlist types
type PlaylistOwner = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
};

type SimplifiedPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
};

type PlaylistTrackObject = {
  added_at: string;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: FullTrack;
};

type FullPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: PaginationBase & { items: PlaylistTrackObject[] };
  type: string;
  uri: string;
};

// Show types
type SimplifiedShow = {
  available_markets: string[];
  copyrights: Copyrights[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
};

// Episode types
type EpisodeBase = {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions?: Restrictions;
};

type FullEpisode = EpisodeBase & {
  show: SimplifiedShow;
};

// Audiobook types
type SimplifiedAudiobook = {
  authors: { name: string }[];
  available_markets: string[];
  copyrights: Copyrights[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: { name: string }[];
  publisher: string;
  type: string;
  uri: string;
  total_chapters: number;
};

type ChapterObject = {
  audio_preview_url: string | null;
  available_markets: string[];
  chapter_number: number;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions?: Restrictions;
};

type FullChapter = ChapterObject & {
  audiobook: SimplifiedAudiobook;
};

type FullAudiobook = SimplifiedAudiobook & {
  chapters: PaginationBase & { items: ChapterObject[] };
};

// Device type
type DeviceObject = {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
  supports_volume: boolean;
};

// Playback context
type PlaybackContext = {
  type: string | null;
  href: string | null;
  external_urls: ExternalUrls;
  uri: string | null;
};

type PlaybackActions = {
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

type PlaybackState = {
  device: DeviceObject;
  repeat_state: string;
  shuffle_state: boolean;
  context: PlaybackContext | null;
  timestamp: number;
  progress_ms: number | null;
  is_playing: boolean;
  item: FullTrack | null;
  currently_playing_type: string;
  actions: PlaybackActions;
};

type CurrentlyPlayingTrack = {
  device: DeviceObject;
  repeat_state: string;
  shuffle_state: boolean;
  context: PlaybackContext | null;
  timestamp: number;
  progress_ms: number | null;
  is_playing: boolean;
  item: FullTrack | null;
  currently_playing_type: string;
  actions: PlaybackActions;
};

type RecentlyPlayedTrack = {
  track: FullTrack;
  played_at: string;
  context: PlaybackContext | null;
};

// User types
type CurrentUserProfile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type PublicUserProfile = {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
};

type CategoryObject = {
  href: string;
  icons: Image[];
  id: string;
  name: string;
};

// Main export type
type SpotifyResponses = {
  albums: {
    getAlbum: FullAlbum;
    getSeveralAlbums: { albums: FullAlbum[] };
    getAlbumTracks: PaginationBase & { items: SimplifiedTrackObject[] };
    getUsersSavedAlbums: PaginationBase & { items: { added_at: string; album: FullAlbum }[] };
    saveAlbumsForCurrentUser: unknown;
    removeUsersSavedAlbums: unknown;
    checkUsersSavedAlbums: boolean[];
    getNewReleases: { albums: PaginationBase & { items: SimplifiedAlbum[] } };
  };
  artists: {
    getArtist: FullArtist;
    getSeveralArtists: { artists: FullArtist[] };
    getArtistsAlbums: PaginationBase & {
      items: (SimplifiedAlbum & { album_group: string })[];
    };
    getArtistsTopTracks: { tracks: FullTrack[] };
  };
  audiobooks: {
    getAnAudiobook: FullAudiobook;
    getSeveralAudiobooks: { audiobooks: FullAudiobook[] };
    getAudiobookChapters: PaginationBase & { items: ChapterObject[] };
    getUsersSavedAudiobooks: PaginationBase & { items: SimplifiedAudiobook[] };
    saveAudiobooksForCurrentUser: unknown;
    removeUsersSavedAudiobooks: unknown;
    checkUsersSavedAudiobooks: boolean[];
  };
  categories: {
    getSeveralBrowseCategories: {
      categories: PaginationBase & { items: CategoryObject[] };
    };
    getSingleBrowseCategory: CategoryObject;
  };
  chapters: {
    getAChapter: FullChapter;
    getSeveralChapters: { chapters: FullChapter[] };
  };
  episodes: {
    getEpisode: FullEpisode;
    getSeveralEpisodes: { episodes: FullEpisode[] };
    getUsersSavedEpisodes: PaginationBase & {
      items: { added_at: string; episode: FullEpisode }[];
    };
    saveEpisodesForCurrentUser: unknown;
    removeUsersSavedEpisodes: unknown;
    checkUsersSavedEpisodes: boolean[];
  };
  markets: {
    getAvailableMarkets: { markets: keyof (typeof iso.market)[] };
  };
  player: {
    getPlaybackState: PlaybackState;
    transferPlayback: unknown;
    getAvailableDevices: { devices: DeviceObject[] };
    getCurrentlyPlayingTrack: CurrentlyPlayingTrack;
    startOrResumePlayback: unknown;
    pausePlayback: unknown;
    skipToNext: unknown;
    skipToPrevious: unknown;
    seekToPosition: unknown;
    setRepeatMode: unknown;
    setPlaybackVolume: unknown;
    togglePlaybackShuffle: unknown;
    getRecentlyPlayedTracks: PaginationBase & {
      cursors: { after: string | null; before: string | null };
      items: RecentlyPlayedTrack[];
    };
    getTheUsersQueue: { currently_playing: FullTrack; queue: FullTrack[] };
    addItemsToPlaybackQueue: unknown;
  };
  playlists: {
    getPlaylist: FullPlaylist;
    changePlaylistDetails: unknown;
    getPlaylistItems: PaginationBase & { items: PlaylistTrackObject[] };
    updatePlaylistItems: { snapshot_id: string };
    addItemsToPlaylist: { snapshot_id: string };
    removePlaylistItems: { snapshot_id: string };
    getCurrentUsersPlaylists: PaginationBase & { items: SimplifiedPlaylist[] };
    getUsersPlaylists: PaginationBase & { items: SimplifiedPlaylist[] };
    createPlaylist: FullPlaylist;
    getPlaylistCoverImage: Image[];
    addCustomPlaylistCoverImage: unknown;
  };
  search: {
    searchForItem: {
      tracks: PaginationBase & { items: FullTrack[] };
      artists: PaginationBase & { items: FullArtist[] };
      albums: PaginationBase & { items: SimplifiedAlbum[] };
      playlists: PaginationBase & { items: SimplifiedPlaylist[] };
      shows: PaginationBase & { items: SimplifiedShow[] };
      episodes: PaginationBase & { items: EpisodeBase[] };
      audiobooks: PaginationBase & { items: SimplifiedAudiobook[] };
    };
  };
  shows: {
    getShow: SimplifiedShow & {
      episodes: PaginationBase & { items: EpisodeBase[] };
    };
    getSeveralShows: { shows: SimplifiedShow[] };
    getShowEpisodes: PaginationBase & { items: EpisodeBase[] };
    getUsersSavedShows: PaginationBase & {
      items: { added_at: string; show: SimplifiedShow }[];
    };
    saveShowsForCurrentUser: unknown;
    removeUsersSavedShows: unknown;
    checkUsersSavedShows: boolean[];
  };
  tracks: {
    getTrack: FullTrack;
    getSeveralTracks: { tracks: FullTrack[] };
    getUsersSavedTracks: PaginationBase & {
      items: { added_at: string; track: FullTrack }[];
    };
    saveTracksForCurrentUser: unknown;
    removeUsersSavedTracks: unknown;
    checkUsersSavedTracks: boolean[];
  };
  users: {
    getCurrentUsersProfile: CurrentUserProfile;
    getUsersTopItems: PaginationBase & { items: FullArtist[] };
    getUsersProfile: PublicUserProfile;
    followPlaylist: unknown;
    unfollowPlaylist: unknown;
    getFollowedArtists: {
      artists: PaginationBase & {
        cursors: { after: string; before: string };
        items: FullArtist[];
      };
    };
    followArtistsOrUsers: unknown;
    unfollowArtistsOrUsers: unknown;
    checkIfUserFollowsArtistsOrUsers: boolean[];
    checkIfCurrentUserFollowsPlaylist: boolean[];
  };
};

type SpotifyCategories = keyof SpotifyResponses;

type SpotifyEndpoints = {
  [C in SpotifyCategories]: keyof SpotifyResponses[C];
};

export type SpotifyEndpointKeys = SpotifyEndpoints[SpotifyCategories];

export type SpotifyResponseFor<K extends SpotifyEndpointKeys> = {
  [C in keyof SpotifyResponses]: K extends keyof SpotifyResponses[C] ? SpotifyResponses[C][K] : never;
}[keyof SpotifyResponses];

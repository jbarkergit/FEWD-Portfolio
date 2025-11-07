export type SpotifyBodyParams = {
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

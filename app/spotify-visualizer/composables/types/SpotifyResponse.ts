import type { spotifyIso } from '~/spotify-visualizer/composables/const/spotifyIso';

export type SpotifyResponse = {
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
      markets: keyof (typeof spotifyIso.market)[];
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

import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import type { Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountBackground = () => {
  const { accountData } = useLoaderData();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<'init' | 'mount' | 'false'>('init');

  // Animate on last image load
  const handleImgLoad = (isLast: boolean) => {
    if (isLast) setVisible('mount');
  };

  // Hide after animation
  useEffect(() => {
    if (visible === 'mount') {
      const timeout = setTimeout(() => setVisible('false'), 3200);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' ref={backdropRef} data-visible={visible}>
        {accountData.map((set: Namespace_Tmdb.BaseMedia_Provider[], setIndex: number) => (
          <ul className='fdAccountBackground__backdrop__set' key={`backdropset${setIndex}`} data-visible={visible === 'mount' ? 'mount' : 'false'}>
            {set.map((article: Namespace_Tmdb.BaseMedia_Provider, liIndex: number) => {
              const isCenteredListItem = setIndex === 2 && liIndex === 1;
              const isLastListItem = setIndex === accountData.length - 1 && liIndex === 3;
              return (
                <li className='fdAccountBackground__backdrop__set__li' key={article.id}>
                  <div className='fdAccountBackground__backdrop__set__li__container'>
                    <img
                      className='fdAccountBackground__backdrop__set__li__container--img'
                      src={`https://image.tmdb.org/t/p/${isCenteredListItem ? `original` : `w300`}/${article?.backdrop_path}`}
                      alt={article?.title}
                      onLoad={() => handleImgLoad(isLastListItem)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FDAccountBackground;

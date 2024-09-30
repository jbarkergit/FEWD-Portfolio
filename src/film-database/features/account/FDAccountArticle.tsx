import { forwardRef, LegacyRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountArticle = forwardRef<HTMLElement, Type_PropDrill>(({ toggleComponent }, articleRefReceiver) => {
  type Type_TextRefs_Mixed_Arr = HTMLElement | HTMLQuoteElement | HTMLHeadingElement;

  const textRefs = useRef<Type_TextRefs_Mixed_Arr[]>([]);

  const textRef: LegacyRef<Type_TextRefs_Mixed_Arr> = (ref): void => {
    if (ref && !textRefs.current?.includes(ref)) textRefs.current?.push(ref);
  };

  const animator = (): void => {
    if (!textRefs.current) return;
    textRefs.current.forEach((ref) => ref.setAttribute('data-anim', 'mount'));
  };

  useEffect(() => animator(), []);

  return (
    <main className='fdAccountArticle' ref={articleRefReceiver} data-activity='disabled'>
      <article className='fdAccountArticle__article'>
        <blockquote className='fdAccountArticle__article__about--blockquote' cite='https://www.themoviedb.org/?language=en-US' ref={textRef}>
          Powered by{' '}
          <Link
            to='https://www.themoviedb.org/?language=en-US'
            className='fdAccountArticle__article__about--blockquote--tmdb'
            aria-label='Visit The Movie Database'
            target='_blank'>
            TMDB
          </Link>
        </blockquote>
        <hgroup className='fdAccountArticle__article__about__hgroup'>
          <h1 className='fdAccountArticle__article__about__hgroup--h1' ref={textRef}>
            Stay in the know with the latest releases
          </h1>
          <h2 className='fdAccountArticle__article__about__hgroup--h2' ref={textRef}>
            Free now, free forever
          </h2>
        </hgroup>
      </article>
    </main>
  );
});

export default FDAccountArticle;

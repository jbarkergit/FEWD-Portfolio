import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountArticle = ({ responseSetArr }: { responseSetArr: Namespace_Tmdb.BaseMedia_Provider[][] }) => {
  return (
    <article className='fdAccountModal__article'>
      <img
        className='fdAccountBackground__backdrop__set__li__container--img'
        src={`https://image.tmdb.org/t/p/${`original`}/${responseSetArr[0][0].backdrop_path}`}
        alt={`${responseSetArr[0][0]?.title}`}
      />
      <h2>Film Database</h2>
      <p>Watch trailers, get cast details, save movies, create a watch queue and more. Free of charge now, free forever.</p>
    </article>
  );
};

export default FDAccountArticle;

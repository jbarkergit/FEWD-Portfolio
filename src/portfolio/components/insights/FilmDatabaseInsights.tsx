import { Link } from 'react-router-dom';

const FilmDatabaseInsights = (): JSX.Element => {
  return (
    <>
      <h2>Film Database</h2>
      <p>
        From the core architecture to the user interface elements, this project represents a self-directed effort to build a movie-database website from scratch,
        without relying on external templates or guides. It provided a valuable opportunity to deepen my JavaScript skills and enhance my critical thinking
        abilities.
      </p>
      <p>
        One of the major challenges was working with the <Link to='https://www.themoviedb.org/'>TheMovieDatabase API</Link> and the{' '}
        <Link to='https://www.npmjs.com/package/react-youtube'>React-YouTube</Link> library. TMDB does not offer WEBP images or consistently formatted URLs, which
        required additional logic and custom TypeGuards to handle image fetching. I addressed this through performance checks and iterative refactoring, developing
        custom hooks to process data efficiently. While there is always room for optimization, the initial page loads now perform satisfactorily.
      </p>
      <p>
        Customizing the YouTube iFrame API presented another significant challenge. To achieve a uniform and cohesive UI similar to Netflix, I needed to create a
        custom solution for the video player interface. Despite the limitations of the available documentation and issues with third-party React packages, I
        succeeded in creating a functional and visually appealing custom controller overlay. This involved overcoming difficulties with the iFrame’s native behavior
        and integrating the player seamlessly into the design.
      </p>
    </>
  );
};

export default FilmDatabaseInsights;

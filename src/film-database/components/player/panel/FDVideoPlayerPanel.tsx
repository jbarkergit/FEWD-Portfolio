import { Link } from 'react-router-dom';

type Type_PropDrill = {
  title: string;
  overview: string;
};

const FDVideoPlayerPanel = ({ title, overview }: Type_PropDrill) => {
  return (
    <section className='FDVideoPlayer__panel'>
      <hgroup>
        <Link to='/film-database' target='_blank'>
          <h1>
            <span>FILM</span>
            <span>DATABASE</span>
          </h1>
        </Link>
        <h2>{title}</h2>
        <h3>{overview}</h3>
        <h4>Available on</h4>
      </hgroup>
    </section>
  );
};
export default FDVideoPlayerPanel;

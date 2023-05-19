import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/StateProvider';

const HeaderKit = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <>
      <span className="navkit__logo flexBox">
        <Link to="/ecommerce" className="flexBox" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
          <i className="fa-solid fa-microphone-lines"></i>
          {'Dynamic Audio'}
        </Link>
      </span>
      <span className="navkit__collections flexBox">
        <span className="navkit__collections__links flexBox justifyCenter">
          <Link
            to="/ecommerce"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Home'}
          </Link>
          <Link
            to="/ecommerce/products"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('')}
          >
            {'All Products'}
          </Link>
          <Link
            to="/ecommerce/headphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('headphone')}
          >
            {'Headphones'}
          </Link>
          <Link
            to="/ecommerce/amps-dacs"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('amp', 'dac')}
          >
            {'Amps & Dacs'}
          </Link>
          <Link
            to="/ecommerce/microphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('microphone')}
          >
            {'Microphones'}
          </Link>
          <Link
            to="/ecommerce/interfaces"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('interface')}
          >
            {'Interfaces'}
          </Link>
        </span>
      </span>
    </>
  );
};

export default HeaderKit;

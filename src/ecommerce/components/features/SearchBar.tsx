import { useLocation } from 'react-router-dom';
import { ProductDatabase } from '../../data/ProductDatabase';

const SearchBar = () => {
  ProductDatabase;

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <input
          className="searchBar__input--input"
          type="text"
          placeholder="Search..."
          style={{
            background: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
          }}
        />
        <span
          className="searchBar__input--icon"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <div className="searchBar__return">
        <ul className="searchBar__return__products">
          {ProductDatabase.map((product, key) => {
            return (
              <li className="searchBar__return__products--product">
                <a href="">
                  {product.company} {product.unit}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

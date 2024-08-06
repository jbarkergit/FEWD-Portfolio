// Features
import FDAccountArticle from '../features/account/FDAccountArticle';
import FDAccountBackground from '../features/account/FDAccountBackground';
import FDAccountRegistry from '../features/account/FDAccountRegistry';

const FDUserAccount = () => {
  return (
    <>
      <FDAccountBackground />
      <FDAccountArticle />
      <FDAccountRegistry />
    </>
  );
};

export default FDUserAccount;

import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import AccountDashboard from '../components/account/AccountDashboard';
import AccountSignIn from '../components/account/AccountSignIn';
import AccountSignUp from '../components/account/AccountSignUp';

const AccountPage = () => {
  return (
    <>
      <Header />
      <AccountSignIn />
      {/* <AccountSignUp /> */}
      {/* <AccountDashboard /> */}
      <Footer />
    </>
  );
};

export default AccountPage;

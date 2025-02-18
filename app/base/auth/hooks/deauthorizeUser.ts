import { useNavigate } from 'react-router';
import { useAuth } from '../context/authProvider';
import { firebaseAuth } from '~/base/config/firebaseConfig';

export async function deauthorizeUser() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  if (!user) return;

  try {
    await firebaseAuth.signOut();
    setUser(null);
    navigate('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

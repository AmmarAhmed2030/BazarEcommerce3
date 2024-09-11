// /components/SessionManager.js
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { clearSession, setSession } from '@/redux/slices/sessionSlice';

const SessionManager = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(setSession({ user: session.user, status }));
    } else {
      dispatch(clearSession());
    }
  }, [session, status, dispatch]);

  return null;
};

export default SessionManager;

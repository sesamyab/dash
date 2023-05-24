import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function ForceLogin() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return <></>;
}

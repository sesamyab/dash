import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState<string>();
  const [isLoading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);

      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      setLoading(false);
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  return { token, isLoading };
};

export default useAuthToken;

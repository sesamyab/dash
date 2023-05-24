import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import ForceLogin from '@/components/auth/Index';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain='auth2.sesamy.dev'
      clientId='VQy2yYCA9rIBJerZrUN0T'
      authorizationParams={{
        redirectUri:
          typeof window !== 'undefined' ? window.location.origin : '',
      }}
    >
      <ForceLogin />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default MyApp;

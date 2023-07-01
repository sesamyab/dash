import { getAccessToken } from '@auth0/nextjs-auth0';
import * as trpcNext from '@trpc/server/adapters/next';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { appRouter } from '../../../server/routers/_app';

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  accessToken: string;
};

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async (opts: CreateNextContextOptions) => {
    const { accessToken } = await getAccessToken(opts.req, opts.res);

    if (!accessToken) {
      throw new Error('Failed to fetch access token');
    }

    return {
      accessToken,
      req: opts.req,
      res: opts.res,
    };
  },
});

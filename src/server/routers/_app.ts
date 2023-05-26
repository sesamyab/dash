import { z } from 'zod';

import {
  getApplication,
  getApplications,
  getTenants,
  getUsers,
} from '@/lib/api';

import { procedure, router } from '../trpc';

export const appRouter = router({
  listTenants: procedure.query(() => getTenants()),

  listApplications: procedure
    .input(
      z.object({
        tenantId: z.string(),
        token: z.string().optional(),
      })
    )
    .query(({ input }) => {
      if (!input.token) {
        return;
      }
      return getApplications(input.tenantId, input.token);
    }),

  getApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        applicationId: z.string(),
      })
    )
    .query(({ input }) => getApplication(input.tenantId, input.applicationId)),

  users: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input }) => getUsers(input.tenantId)),
});

// export type definition of API
export type AppRouter = typeof appRouter;

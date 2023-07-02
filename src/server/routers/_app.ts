import { z } from 'zod';

import {
  createApplication,
  createTenant,
  getApplication,
  getApplications,
  getTenants,
  getUsers,
  patchApplication,
} from '@/lib/api';

import { procedure, router } from '../trpc';

export const appRouter = router({
  listTenants: procedure.query(() => getTenants()),

  createApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input }) => createApplication(input.tenantId, input.name)),

  createTenant: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => createTenant(input.name)),

  listApplications: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return getApplications(input.tenantId, ctx.accessToken);
    }),

  getApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        applicationId: z.string(),
      })
    )
    .query(({ input }) => getApplication(input.tenantId, input.applicationId)),

  updateApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        applicationId: z.string(),
        name: z.string().optional(),
        clientSecret: z.string().optional(),
      })
    )
    .mutation(({ input }) =>
      patchApplication(input.tenantId, input.applicationId, {
        name: input.name,
        clientSecret: input.clientSecret,
      })
    ),

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

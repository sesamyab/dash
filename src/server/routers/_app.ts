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
  listTenants: procedure.query(({ ctx }) => getTenants(ctx.accessToken)),

  createApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) =>
      createApplication(input.tenantId, input.name, ctx.accessToken)
    ),

  createTenant: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) => createTenant(input.name, ctx.accessToken)),

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
    .query(({ input, ctx }) =>
      getApplication(input.tenantId, input.applicationId, ctx.accessToken)
    ),

  updateApplication: procedure
    .input(
      z.object({
        tenantId: z.string(),
        applicationId: z.string(),
        name: z.string().optional(),
        clientSecret: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) =>
      patchApplication(
        input.tenantId,
        input.applicationId,
        {
          name: input.name,
          clientSecret: input.clientSecret,
        },
        ctx.accessToken
      )
    ),

  users: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input, ctx }) => getUsers(input.tenantId, ctx.accessToken)),
});

// export type definition of API
export type AppRouter = typeof appRouter;

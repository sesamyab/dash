import { z } from 'zod';

import {
  createApplication,
  createConnection,
  createTenant,
  deleteConnection,
  getApplication,
  getConnection,
  getTenants,
  getUser,
  getUsers,
  listApplications,
  listConnections,
  patchApplication,
  patchConnection,
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

  createConnection: procedure
    .input(
      z.object({
        tenantId: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) =>
      createConnection(input.tenantId, input.name, ctx.accessToken)
    ),

  createTenant: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) => createTenant(input.name, ctx.accessToken)),

  deleteConnection: procedure
    .input(
      z.object({
        tenantId: z.string(),
        connectionId: z.string(),
      })
    )
    .mutation(({ input, ctx }) =>
      deleteConnection(input.tenantId, input.connectionId, ctx.accessToken)
    ),

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

  getConnection: procedure
    .input(
      z.object({
        tenantId: z.string(),
        connectionId: z.string(),
      })
    )
    .query(({ input, ctx }) =>
      getConnection(input.tenantId, input.connectionId, ctx.accessToken)
    ),

  getUser: procedure
    .input(
      z.object({
        tenantId: z.string(),
        userId: z.string(),
      })
    )
    .query(({ input, ctx }) =>
      getUser(input.tenantId, input.userId, ctx.accessToken)
    ),

  listApplications: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return listApplications(input.tenantId, ctx.accessToken);
    }),

  listConnections: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return listConnections(input.tenantId, ctx.accessToken);
    }),

  listUsers: procedure
    .input(
      z.object({
        tenantId: z.string(),
      })
    )
    .query(({ input, ctx }) => getUsers(input.tenantId, ctx.accessToken)),

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

  updateConnection: procedure
    .input(
      z.object({
        tenantId: z.string(),
        connectionId: z.string(),
        name: z.string().optional(),
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
        authorizationEndpoint: z.string().optional(),
        tokenEndpoint: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) =>
      patchConnection(
        input.tenantId,
        input.connectionId,
        {
          name: input.name,
          clientId: input.clientId,
          clientSecret: input.clientSecret,
          authorizationEndpoint: input.authorizationEndpoint,
          tokenEndpoint: input.tokenEndpoint,
        },
        ctx.accessToken
      )
    ),
});

// export type definition of API
export type AppRouter = typeof appRouter;

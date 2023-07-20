const API_URL = 'https://auth2.sesamy.dev';

export interface Tenant {
  id: string;
  name: string;
  audience: string;
  issuer: string;
  senderEmail: string;
  senderName: string;
  createdAt: string;
  modifiedAt: string;
}

export interface User {
  [key: string]: number | string;
  id: string;
  name: string;
  email: string;
  // given_name?: string;
  // family_name?: string;
  // name?: string;
  // picture?: string;
}

export interface Application {
  [key: string]: number | string;
  id: string;
  name: string;
  clientSecret: string;
}

export interface Connection {
  [key: string]: number | string;
  id: string;
  name: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
}

export interface Migration {
  [key: string]: number | string;
  id: string;
  provider: string;
  clientId: string;
  domain: string;
}

export async function createTenant(
  name: string,
  token: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/tenants`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      audience: 'http://sesamy.com',
      issuer: 'http://auth2.sesamy.dev',
      senderEmail: 'auth@sesamy.dev',
      senderName: 'Sesamy Auth',
    }),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function createApplication(
  tenantId: string,
  name: string,
  token: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/applications`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      allowedWebOrigins: '',
      allowedCallbackUrls: '',
      allowedLogoutUrls: '',
      clientSecret: '',
    }),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function createConnection(
  tenantId: string,
  name: string,
  token: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/connections`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      clientId: '',
      clientSecret: '',
      authorizationEndpoint: '',
      tokenEndpoint: '',
    }),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function createMigration(
  tenantId: string,
  provider: string,
  token: string
): Promise<Migration> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/migrations`, {
    method: 'POST',
    body: JSON.stringify({
      provider,
      clientId: '',
      domain: '',
      origin: '',
    }),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function deleteConnection(
  tenantId: string,
  connectionId: string,
  token: string
): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/connections/${connectionId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    }
  );

  return response.ok;
}

export async function deleteMigration(
  tenantId: string,
  migrationId: string,
  token: string
): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/migrations/${migrationId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    }
  );

  return response.ok;
}

export async function getApplication(
  tenantId: string,
  applicationId: string,
  token: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/applications/${applicationId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function getConnection(
  tenantId: string,
  connectionId: string,
  token: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/connections/${connectionId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function getMigration(
  tenantId: string,
  migtationId: string,
  token: string
): Promise<Migration> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/migrations/${migtationId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function getUser(
  tenantId: string,
  userId: string,
  token: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/users/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function listApplications(
  tenantId: string,
  token: string
): Promise<Application[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/applications`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function listConnections(
  tenantId: string,
  token: string
): Promise<Connection[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/connections`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function listMigrations(
  tenantId: string,
  token: string
): Promise<Migration[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/migrations`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function listTenants(token: string): Promise<Tenant[]> {
  const response = await fetch(`${API_URL}/tenants`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function listUsers(
  tenantId: string,
  token: string
): Promise<User[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export interface PatchApplicationData {
  name?: string;
  clientSecret?: string;
  allowedCallbackUrls?: string;
}

export async function patchApplication(
  tenantId: string,
  applicationId: string,
  data: PatchApplicationData,
  token: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/applications/${applicationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();

  return responseData;
}

export interface PatchConnectionData {
  name?: string;
  clientId?: string;
  clientSecret?: string;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
}

export async function patchConnection(
  tenantId: string,
  connectionId: string,
  data: PatchConnectionData,
  token: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/connections/${connectionId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();

  return responseData;
}

export interface PatchMigrationData {
  provider?: string;
  clientId?: string;
  domain?: string;
  origin?: string;
}

export async function patchMigration(
  tenantId: string,
  migrationId: string,
  data: PatchMigrationData,
  token: string
): Promise<Migration> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/migrations/${migrationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();

  return responseData;
}

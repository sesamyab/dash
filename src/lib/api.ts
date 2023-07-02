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
}

export async function createTenant(name: string): Promise<Application> {
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
    },
  });
  const data = await response.json();

  return data;
}

export async function getTenants(): Promise<Tenant[]> {
  const response = await fetch(`${API_URL}/tenants`);
  const data = await response.json();

  return data;
}

export async function getUsers(tenantId: string): Promise<User[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/users`);
  const data = await response.json();

  return data;
}

export async function getApplications(
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

export async function createApplication(
  tenantId: string,
  name: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/applications`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      tenantId,
      allowedWebOrigins: '',
      allowedCallbackUrls: '',
      allowedLogoutUrls: '',
      clientSecret: '',
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}

export async function getApplication(
  tenantId: string,
  applicationId: string
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/applications/${applicationId}`
  );
  const data = await response.json();

  return data;
}

export interface PatchApplicationData {
  name?: string;
  clientSecret?: string;
}

export async function patchApplication(
  tenantId: string,
  applicationId: string,
  data: PatchApplicationData
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/tenants/${tenantId}/applications/${applicationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const responseData = await response.json();

  return responseData;
}

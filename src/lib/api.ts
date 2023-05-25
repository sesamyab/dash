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
  tenantId: string
): Promise<Application[]> {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/applications`);
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
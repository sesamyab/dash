const API_URL = 'https://auth2.sesamy.dev';

export interface Tenant {
  id: string;
  name: string;
  // audience: string,
  // issuer: string,
  // senderEmail: string,
  // senderName: string,
  // createdAt: string,
  // modifiedAt: string,
}

export async function getTenants(token: string): Promise<Tenant[]> {
  const response = await fetch(`${API_URL}/tenants`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function getUsers(tenantId: string) {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/users`);
  const data = await response.json();

  return data;
}

export async function getApplications(tenantId: string) {
  const response = await fetch(`${API_URL}/tenants/${tenantId}/applications`);
  const data = await response.json();

  return data;
}

import { useRouter } from 'next/router';

import { Tenant } from '@/lib/api';

export default function TenantSelector({ tenants }: { tenants: Tenant[] }) {
  const router = useRouter();
  const { param } = router.query;

  if (!tenants || tenants.length === 0) {
    return <div>{param}</div>;
  }

  return (
    <div>
      {tenants.map((tenant) => (
        <div key={tenant.id}>{tenant.name}</div>
      ))}
    </div>
  );
}

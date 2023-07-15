import { useRouter } from 'next/router';

import NotFound from '@/components/NotFound';
import PageLoader from '@/components/PageLoader';

import { trpc } from '@/utils/trpc';

export default function HomePage() {
  const router = useRouter();

  const tenantResults = trpc.listTenants.useQuery();
  if (tenantResults.isLoading) {
    return PageLoader();
  }

  if (!tenantResults.data) {
    return NotFound();
  }

  const firstTenant = tenantResults.data[0];

  if (!firstTenant) {
    router.push(`/tenants/create`);
  } else {
    router.push(`/tenants/${firstTenant.id}`);
  }
}

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

import NotFound from '@/components/NotFound';
import PageLoader from '@/components/PageLoader';

import { trpc } from '@/utils/trpc';

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  if (isAuthenticated) {
    return PageLoader();
  }

  const tenantResults = trpc.listTenants.useQuery();
  if (tenantResults.isLoading) {
    return PageLoader();
  }

  if (!tenantResults.data) {
    return NotFound();
  }

  router.push(`/tenants/${tenantResults.data[0].id}`);
}

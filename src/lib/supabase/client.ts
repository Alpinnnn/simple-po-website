'use client'; // For client-side Supabase client, if needed for components

import type { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

// For client components
let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabaseBrowserClient() {
  if (typeof window !== 'undefined' && client) {
    return client;
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
}


// For server components, route handlers, server actions
// Note: createServerClient is typically used within specific contexts like route handlers or server actions.
// For general server-side data fetching in components, you might use createServerComponentClient.
// However, for simplicity and broader use in RSCs, using the service_role key directly for read operations
// can be an option if security policies are well-defined. Or, pass auth context if needed.
// The provided snippet is more for client-side, but a server client can be structured similarly
// or use the specific helpers from '@supabase/ssr'.

// For this example, data fetching in Server Components will use createBrowserClient
// as if it were a generic client, but ensure env vars are correctly exposed.
// A more robust server-side approach would use cookies for auth if user-specific data is needed.
// Since these are public listings, a simple client is fine.

// If you need a server client for RSC that doesn't rely on browser context:
// import { createClient } from '@supabase/supabase-js';
// export const supabaseServerClient = createClient<Database>(
// process.env.NEXT_PUBLIC_SUPABASE_URL!,
// process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side admin tasks if needed, or anon key for public data
// );

// For now, Server Components will use the same browser client setup for public data fetching.
// This simplifies the setup as functions in Server Components can directly instantiate it.
// For authenticated requests or row-level security dependent on users, use @supabase/ssr's createServerClient with cookies.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  const cookieObject = await cookieStore;
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false  // Importante para rotas de API
      },
      global: {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        }
      },
      cookies: {
        getAll() {
          return cookieObject.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value
          }))
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieObject.set(name, value, options)
            })
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

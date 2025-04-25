// This is a mock supabase client to keep existing code working
// while we've removed the actual Supabase integration

// Mock Supabase client with basic functionality to prevent errors
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      order: () => ({
        limit: () => ({
          then: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      limit: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: () => Promise.resolve({ data: { path: '' }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } }),
    }),
  },
  auth: {
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  rpc: (func: string, params?: any) => Promise.resolve({ data: null, error: null }),
};

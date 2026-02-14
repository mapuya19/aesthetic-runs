import { supabase } from './supabase';

export interface AuthError {
  message: string;
  code?: string;
}

export async function handleAuthError(error: unknown) {
  console.error('Auth error:', error);

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('email not confirmed')) {
      return {
        message:
          'Please check your email and click the confirmation link to activate your account.',
        code: 'EMAIL_NOT_CONFIRMED',
      };
    }

    if (message.includes('invalid login credentials')) {
      return {
        message: 'Invalid email or password. Please try again.',
        code: 'INVALID_CREDENTIALS',
      };
    }

    if (message.includes('user already registered')) {
      return {
        message: 'An account with this email already exists. Please log in instead.',
        code: 'USER_EXISTS',
      };
    }

    return {
      message: 'An authentication error occurred. Please try again.',
      code: 'AUTH_ERROR',
    };
  }
}

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  register: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  getSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      return session;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  onAuthStateChange: (callback: (session: any) => void) => {
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('Auth state changed:', { event, hasSession: !!session });
        callback(session);
      });

      return subscription;
    } catch (error) {
      console.error('Error setting up auth state change:', error);
      throw error;
    }
  },
};

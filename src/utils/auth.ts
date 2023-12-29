// utils/auth.ts

export interface User {
    username: string;
    role: 'admin' | 'user'; // Example role types
  }
  
  let currentUser: User | null = null;
  
  export const signIn = (username: string, password: string): User | null => {
    // Simulate authentication logic (e.g., check username and password)
    // For demonstration purposes, let's assume successful authentication
    currentUser = {
      username,
      role: 'admin', // You can determine the role based on your authentication logic
    };
    return currentUser;
  };
  
  export const signOut = (): void => {
    // Simulate signing out by resetting the currentUser
    currentUser = null;
  };
  
  export const getCurrentUser = (): User | null => {
    // Return the current user
    return currentUser;
  };
  
  export const isAuthenticated = (): boolean => {
    // Check if a user is authenticated (currentUser exists)
    return !!currentUser;
  };
  
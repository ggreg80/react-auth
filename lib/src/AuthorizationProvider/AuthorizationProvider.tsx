import React from 'react';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface AuthorizationProviderProps {
  children: React.ReactNode;
}

/**
 * Provide isAuthorized function to all AuthorizedRoutes.
 */
export default function AuthorizationProvider({
  children,
  ...rest
}: AuthorizationProviderProps & AuthContextValue): JSX.Element {
  return <AuthContext.Provider value={rest}>{children}</AuthContext.Provider>;
}

import React from 'react';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface AuthorizationProviderProps extends AuthContextValue {
  children: React.ReactNode;
}

/**
 * Provide isAuthorized function to all AuthorizedRoutes.
 */
export default function AuthorizationProvider({
  children,
  ...rest
}: AuthorizationProviderProps): JSX.Element {
  return <AuthContext.Provider value={rest}>{children}</AuthContext.Provider>;
}

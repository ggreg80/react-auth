import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is not logged in, else render nothing.
 */
export default function NotLoggedIn({ children }: React.PropsWithChildren<{}>): React.ReactNode {
  const { isLoggedIn } = useContext(AuthContext);
  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;
  return loggedIn ? null : children;
}

import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is not logged in, else render nothing.
 */
export default function NotLoggedIn({ children }: React.PropsWithChildren<{}>): JSX.Element | null {
  const { isLoggedIn } = useContext(AuthContext);
  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;
  const result = loggedIn ? null : (children as JSX.Element);
  if (result === undefined) return null;
  return result;
}

import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

export interface AuthorizedProps {
  role?: any;
  /**
   * Invert result from AuthorizationProvider.isAuthorized for render children.
   * Example: `not role={ANONYMOUS}` - render children if user not ANONYMOUS.
   */
  not?: boolean;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is logged in and authorized, else render nothing.
 */
export default function Authorized({
  role,
  not,
  children,
}: React.PropsWithChildren<AuthorizedProps>): JSX.Element | null {
  const { isAuthorized } = useContext(AuthContext);
  const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;
  return (!not && authorized) || (not && !authorized) ? (children as JSX.Element) : null;
}

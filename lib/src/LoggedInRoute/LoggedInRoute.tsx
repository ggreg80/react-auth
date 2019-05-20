import React, { useContext } from 'react';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';
import getLocationWithState from '../getLocationWithState';

const AuthRoute = withRouter(
  ({
    isLoggedIn,
    redirectTo,
    location,
    routeProps,
  }: AuthContextValue & RouteComponentProps & { routeProps: RouteProps }) => {
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

    if (!loggedIn) {
      const { component, render, children, ...rest } = routeProps;
      const to = getLocationWithState(redirectTo, location);

      return (
        <Route {...rest}>
          <Redirect to={to} />
        </Route>
      );
    }

    return <Route {...routeProps} />;
  }
);

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute(props: RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={props} />;
}

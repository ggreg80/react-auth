import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not logged in, else render `Redirect`.
 */
export default class NotLoggedInRoute extends React.Component<RouteProps> {
  private renderRoute = ({ isLoggedIn, notLoggedInRedirectTo }: AuthContextValue) => {
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

    if (loggedIn) {
      const { component, render, children, ...rest } = this.props;
      return (
        <Route {...rest}>
          <Redirect to={notLoggedInRedirectTo} />
        </Route>
      );
    }

    return <Route {...this.props} />;
  };

  render() {
    return <AuthContext.Consumer>{this.renderRoute}</AuthContext.Consumer>;
  }
}

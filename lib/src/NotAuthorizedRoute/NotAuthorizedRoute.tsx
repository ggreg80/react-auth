import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface Props {
  role: any;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not authorized, else render `Redirect`.
 */
export default class NotAuthorizedRoute extends React.Component<Props & RouteProps> {
  private renderRoute = ({ isAuthorized, notLoggedInRedirectTo }: AuthContextValue) => {
    const authorized =
      typeof isAuthorized === 'function' ? isAuthorized(this.props.role) : isAuthorized;

    if (authorized) {
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

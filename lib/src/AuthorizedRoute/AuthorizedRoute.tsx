import React from 'react';
import { LocationDescriptorObject } from 'history';
import PropTypes from 'prop-types';
import { Route, RouteProps, Redirect } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface FromLocationState {
  from: string;
}

export interface FromLocationDescriptorObject extends LocationDescriptorObject {
  state?: FromLocationState;
}

export interface Props {
  role: any;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is authorized, else render `Redirect`.
 */
export default class AuthorizedRoute extends React.Component<Props & RouteProps> {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  private renderRoute = ({ isAuthorized, redirectTo }: AuthContextValue) => {
    const { router } = this.context;
    const authorized =
      typeof isAuthorized === 'function' ? isAuthorized(this.props.role) : isAuthorized;

    if (!authorized) {
      const { component, render, children, ...rest } = this.props;
      const to =
        typeof redirectTo === 'string'
          ? ({
              pathname: redirectTo,
              state: { from: router.route.location.pathname },
            } as FromLocationDescriptorObject)
          : redirectTo;

      return (
        <Route {...rest}>
          <Redirect to={to} />
        </Route>
      );
    }

    return <Route {...this.props} />;
  };

  render() {
    return <AuthContext.Consumer>{this.renderRoute}</AuthContext.Consumer>;
  }
}

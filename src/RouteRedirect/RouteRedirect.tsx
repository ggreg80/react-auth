import React from 'react';
import { Route, RouteProps, Redirect, RedirectProps, useLocation } from 'react-router';
import getLocationWithState from '@vlazh/route-utils/getLocationWithState';

export interface RouteRedirectProps extends RouteProps, Pick<RedirectProps, 'to'> {}

export default function RouteRedirect({
  to,
  component,
  render,
  children,
  ...rest
}: RouteRedirectProps): JSX.Element {
  const location = useLocation();
  const redirectTo = getLocationWithState(to, location);
  return <Route {...rest} render={() => <Redirect to={redirectTo} />} />;
}

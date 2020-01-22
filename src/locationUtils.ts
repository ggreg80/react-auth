import { LocationDescriptorObject, Location, LocationDescriptor } from 'history';

export interface FromLocationState {
  from: Pick<Location<unknown>, 'pathname' | 'search' | 'state'>;
}

export function getLocationFromState(
  location: Location<unknown>,
  fallback: Location['pathname'] | LocationDescriptorObject<unknown>
): LocationDescriptorObject<unknown> {
  return (
    (location.state && (location.state as FromLocationState).from) ||
    (typeof fallback === 'string' ? { pathname: fallback } : fallback)
  );
}

export function getLocationWithState(
  to: LocationDescriptor<unknown>,
  from: Location<unknown> | Location['pathname']
): LocationDescriptorObject<FromLocationState> {
  const fromState: FromLocationState['from'] =
    typeof from === 'string'
      ? {
          pathname: from,
          search: '',
          state: null,
        }
      : {
          pathname: from.pathname,
          search: from.search,
          state: from.state,
        };

  return typeof to === 'string'
    ? { pathname: to, state: { from: fromState } }
    : {
        ...to,
        state: {
          ...(to.state && typeof to.state === 'object' ? to.state : undefined),
          from: fromState,
        },
      };
}

import { LocationDescriptorObject, Location, LocationDescriptor } from 'history';

export interface FromLocationState {
  from: Pick<Location, 'pathname' | 'search' | 'state'>;
}

export function getLocationFromState(
  location: Location<FromLocationState>,
  fallback: string | LocationDescriptorObject
): LocationDescriptorObject {
  return (
    (location.state && location.state.from) ||
    (typeof fallback === 'string' ? { pathname: fallback } : fallback)
  );
}

export function getLocationWithState(
  to: LocationDescriptor,
  from: Location
): LocationDescriptorObject<FromLocationState> {
  return typeof to === 'string'
    ? {
        pathname: to,
        state: {
          from: {
            pathname: from.pathname,
            search: from.search,
            state: from.state,
          },
        },
      }
    : {
        ...to,
        state: {
          ...to.state,
          from: {
            pathname: from.pathname,
            search: from.search,
            state: from.state,
          },
        },
      };
}

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
  from: Location | Location['pathname']
): LocationDescriptorObject<FromLocationState> {
  const fromState: FromLocationState['from'] =
    typeof from === 'string'
      ? {
          pathname: from,
          search: '',
          state: undefined,
        }
      : {
          pathname: from.pathname,
          search: from.search,
          state: from.state,
        };

  return typeof to === 'string'
    ? { pathname: to, state: { from: fromState } }
    : { ...to, state: { ...to.state, from: fromState } };
}

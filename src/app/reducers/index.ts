import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  // this router reducer is used for time traveling debugging
  // checkout appmodule StoreRouterConnectingModule
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);
    console.log('-----------------------');

    return reducer(state, action);
  };
}

// metareducer - very similar to module reducer but it's processed before anything else
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];


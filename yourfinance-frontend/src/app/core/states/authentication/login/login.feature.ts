// Initial state: Provides the NgRx store with default values for access token and account status values
// Reducer: Update the state of access token and account status values
// Selectors: Return the required value from the NgRx store
import { createFeature, createReducer, on } from "@ngrx/store";
import { accountAuthenticatedSuccess, accountAuthenticatedFailure } from "./login.actions";

export interface LoginState {
    accessToken: string,
    accountStatus: string,
    error: unknown | null,
}

// Initial state provided to the NgRx store
const initialState: LoginState = {
    accessToken: '',
    accountStatus: '',
    error: null,
}

// The reducer uses this function to update the state of username and account status values
const updateState = (state: LoginState, { accessToken, accountStatus }: LoginState) => ({
    ...state,
    accessToken,
    accountStatus
});

// Generates the Reducer and the Selectors
export const LoginFeature = createFeature({
    name: 'login',
    reducer: createReducer(
        initialState,
        on(accountAuthenticatedSuccess, (state, { accessToken, accountStatus }) => ({
            ...state,
            accessToken,
            accountStatus,
            error: null
        })),

        on(accountAuthenticatedFailure, (state, { error }) => ({
            ...state,
            accessToken: '',
            accountStatus: '',
            error
        }))
        ),
});

/**
 * Provides access to the reducer and selectors
 * Selectors:
 *  Whole state (access token and account status response)
 *  Access token
 *  Account status
 */
export const {
    name: loginFeatureKey,
    reducer: loginReducer,
    selectLoginState,
    selectAccessToken,
    selectAccountStatus,
} = LoginFeature;
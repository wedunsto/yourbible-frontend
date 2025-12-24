import { createFeature, createReducer, on } from "@ngrx/store";
import { accountCreatedResult } from "./register.actions";

export interface RegisterState {
    username: string,
    accountStatus: string
}

// Initial state provided to the NgRx store
const initialState: RegisterState = {
    username: '',
    accountStatus: ''
}

// The reducer uses this function to update the state of username and account status values
const updateState = (state: RegisterState, { username, accountStatus}: RegisterState) => ({
    ...state,
    username,
    accountStatus
});

// Generates the Reducer and the Selectors
export const RegisterFeature = createFeature({
    name: 'register',
    reducer: createReducer(
        initialState,
        on(accountCreatedResult, updateState)
    ),
});

/**
 * Provides access to the reducer and selectors
 * Selectors:
 *  Whole state (username and account status result)
 *  Username
 *  Account status
 */
export const {
    name: registerFeatureKey,
    reducer: registerReducer,
    selectRegisterState,
    selectUsername,
    selectAccountStatus,
} = RegisterFeature;
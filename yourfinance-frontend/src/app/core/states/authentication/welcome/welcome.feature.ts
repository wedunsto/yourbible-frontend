import { createFeature, createReducer, on } from "@ngrx/store";
import { userExistsResult } from "./welcome.actions";

export interface WelcomeState {
    username: string,
    exists: boolean
}

// Initial state provided to the NgRx store
const initialState: WelcomeState = {
    username: '',
    exists: false
}

// The reducer uses this function to update the state of username and exists values
const updateState = (state: WelcomeState, { username, exists }: WelcomeState) => ({
    ...state,
    username,
    exists,
});

// Generates the Reducer and the Selectors
export const WelcomeFeature = createFeature({
    name: 'welcome',
    reducer: createReducer(
        initialState,
        on(userExistsResult, updateState)
    ),
});

/**
 * Provides access to the reducer and selectors
 * Selectors:
 *  Whole state (username and exists result)
 *  Username
 *  Exists
 */
export const {
    name: welcomeFeatureKey,
    reducer: welcomeReducer,
    selectWelcomeState,
    selectUsername,
    selectExists,
} = WelcomeFeature;
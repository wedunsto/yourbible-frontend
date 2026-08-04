import { createFeature, createReducer, on } from "@ngrx/store";
import { userExistsResult } from "./welcome.actions";

export interface WelcomeState {
    username: string,
    destination: string | null
}

// Initial state provided to the NgRx store
// Username is rehydrated from localStorage so it survives a page refresh
const initialState: WelcomeState = {
    username: localStorage.getItem('username') ?? '',
    destination: null
}

// The reducer uses this function to update the state of username and exists values
const updateState = (state: WelcomeState, { username, destination }: WelcomeState) => ({
    ...state,
    username,
    destination,
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
    selectDestination,
} = WelcomeFeature;
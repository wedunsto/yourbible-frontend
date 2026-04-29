// Initial state: Provides the NgRx store with default values for a user's Bible study notes
// Reducer: Update the state of a user's Bible study notes
// Selectors: Return the required value from the NgRx store

import { createFeature, createReducer, on } from "@ngrx/store";
import { BibleStudyNote } from "src/app/core/models/BibleStudyNote.model";
import { createBibleStudyNoteSuccess } from "./create.actions";

export interface BibleStudyNotesState {
    bibleStudyNotes: BibleStudyNote[]
}

// Initial state provided to the NgRx store
const initialState: BibleStudyNotesState = {
    bibleStudyNotes: []
};

// The reducer uses this function to update the state of a user's Bible study notes
const updateState = (state: BibleStudyNotesState, bibleStudyNote: BibleStudyNote) => (
    [...state.bibleStudyNotes, bibleStudyNote]
);

// Generates the Reducer and the Selectors
export const BibleStudyFeature = createFeature({
    name: 'bibleStudy',
    reducer: createReducer(
        initialState,
        on(createBibleStudyNoteSuccess, (state, { response }) => ({
            ...state,
            bibleStudyNotes: [...state.bibleStudyNotes, response.response],
        }))
    ),
});

/**
 * Provides access to the reducer and selectors
 * Selectors:
 *  Whole state (access all Bible study notes)
 */
export const {
    name: bibleStudyFeatureKey,
    reducer: bibleStudyReducer,
    selectBibleStudyNotes
} = BibleStudyFeature;
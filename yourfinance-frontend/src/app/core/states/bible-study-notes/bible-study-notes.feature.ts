// Initial state: Provides the NgRx store with default values for a user's Bible study notes
// Reducer: Update the state of a user's Bible study notes
// Selectors: Return the required value from the NgRx store

import { createFeature, createReducer, on } from "@ngrx/store";
import { createBibleStudyNoteSuccess } from "./create/create.actions";
import { readBibleStudyNotesSuccess } from "./read/read.actions";
import { deleteBibleStudyNoteSuccess } from "./delete/delete.actions";
import { updateBibleStudyNoteSuccess } from "./update/update.actions";
import { BibleStudyNote } from "../../models/BibleStudyNote.model";

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
        })),
        on(readBibleStudyNotesSuccess, (state, { response }) => ({
            ...state,
            bibleStudyNotes: response.bibleStudyNotes,
        })),
        on(deleteBibleStudyNoteSuccess, (state, { response }) => ({
            ...state,
            bibleStudyNotes: state.bibleStudyNotes.filter((note) => note.id !== response.id),
        })),
        on(updateBibleStudyNoteSuccess, (state, { response }) => ({
            ...state,
            bibleStudyNotes: state.bibleStudyNotes.map((note) =>
                note.id === response.response.id ? response.response : note
            ),
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
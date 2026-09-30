// Initial state: Provides the NgRx store with default values for a user's Bible verse categories
// Reducer: Update the state of a user's Bible verse categories
// Selectors: Return the required value from the NgRx store

import { createFeature, createReducer, on } from "@ngrx/store";
import {
    createBibleVerseCategoryFailure,
    createBibleVerseCategorySuccess,
    deleteBibleVerseCategoryFailure,
    deleteBibleVerseCategorySuccess,
    readBibleVerseCategoriesFailure,
    readBibleVerseCategoriesSuccess,
    readBibleVerseCategoryFailure,
    readBibleVerseCategorySuccess,
    updateBibleVerseCategoryFailure,
    updateBibleVerseCategorySuccess
} from "./bible-verse-categories.actions";
import { BibleVerseCategoryResponse } from "../../services/bible-verse-categories/bible-verse-categories.service";

export interface BibleVerseCategoriesState {
    categories: BibleVerseCategoryResponse[],
    error: unknown | null
}

// Initial state provided to the NgRx store
const initialState: BibleVerseCategoriesState = {
    categories: [],
    error: null
};

/**
 * Replaces the category with a matching id, or appends it when it isn't stored yet.
 * @param categories The currently stored categories
 * @param category The category returned by the back-end
 * @returns A new array containing the category
 */
export const upsertCategory = (
    categories: BibleVerseCategoryResponse[],
    category: BibleVerseCategoryResponse
): BibleVerseCategoryResponse[] =>
    categories.some(({ id }) => id === category.id)
        ? categories.map((stored) => stored.id === category.id ? category : stored)
        : [...categories, category];

/**
 * Removes the category with the given id.
 * @param categories The currently stored categories
 * @param id The id of the deleted category
 * @returns A new array without the deleted category
 */
export const removeCategory = (
    categories: BibleVerseCategoryResponse[],
    id: string
): BibleVerseCategoryResponse[] =>
    categories.filter((category) => category.id !== id);

// Generates the Reducer and the Selectors
export const BibleVerseCategoriesFeature = createFeature({
    name: 'bibleVerseCategories',
    reducer: createReducer(
        initialState,
        on(readBibleVerseCategoriesSuccess, (state, { categories }) => ({
            ...state,
            categories,
            error: null
        })),
        on(
            createBibleVerseCategorySuccess,
            readBibleVerseCategorySuccess,
            updateBibleVerseCategorySuccess,
            (state, { category }) => ({
                ...state,
                categories: upsertCategory(state.categories, category),
                error: null
            })
        ),
        on(deleteBibleVerseCategorySuccess, (state, { id }) => ({
            ...state,
            categories: removeCategory(state.categories, id),
            error: null
        })),
        on(
            createBibleVerseCategoryFailure,
            readBibleVerseCategoriesFailure,
            readBibleVerseCategoryFailure,
            updateBibleVerseCategoryFailure,
            deleteBibleVerseCategoryFailure,
            (state, { error }) => ({
                ...state,
                error
            })
        )
    ),
});

/**
 * Provides access to the reducer and selectors
 * Selectors:
 *  Whole state (categories and error)
 *  Categories
 *  Error
 */
export const {
    name: bibleVerseCategoriesFeatureKey,
    reducer: bibleVerseCategoriesReducer,
    selectBibleVerseCategoriesState,
    selectCategories: selectBibleVerseCategories,
    selectError: selectBibleVerseCategoriesError
} = BibleVerseCategoriesFeature;

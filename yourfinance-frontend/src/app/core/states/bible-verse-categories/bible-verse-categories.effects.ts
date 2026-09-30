// Calls the Bible verse categories service
// Bridges the gap between the NgRx store and the back-end

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import {
    createBibleVerseCategoryFailure,
    createBibleVerseCategoryRequest,
    createBibleVerseCategorySuccess,
    deleteBibleVerseCategoryFailure,
    deleteBibleVerseCategoryRequest,
    deleteBibleVerseCategorySuccess,
    readBibleVerseCategoriesFailure,
    readBibleVerseCategoriesRequest,
    readBibleVerseCategoriesSuccess,
    readBibleVerseCategoryFailure,
    readBibleVerseCategoryRequest,
    readBibleVerseCategorySuccess,
    updateBibleVerseCategoryFailure,
    updateBibleVerseCategoryRequest,
    updateBibleVerseCategorySuccess
} from "./bible-verse-categories.actions";
import { BibleVerseCategories } from "../../services/bible-verse-categories/bible-verse-categories.service";

@Injectable()
export class BibleVerseCategoriesEffects {
    /**
     * @param actions$ Stream of every dispatched NgRx action
     * @param bibleVerseCategoriesService Sends Bible verse category CRUD requests to the back-end
     */
    constructor(
        private actions$: Actions,
        private bibleVerseCategoriesService: BibleVerseCategories
    ) {}

    // Create: mergeMap so creating several categories at once (e.g. onboarding) doesn't cancel earlier requests
    createBibleVerseCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createBibleVerseCategoryRequest),
            mergeMap(({ request }) =>
                this.bibleVerseCategoriesService.createBibleVerseCategory(request).pipe(
                    map((category) => createBibleVerseCategorySuccess({ category })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error creating Bible verse category', error);
                        return of(createBibleVerseCategoryFailure({ error }));
                    })
                )
            )
        )
    )

    // Read all: only the latest request for the user's categories matters
    readBibleVerseCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(readBibleVerseCategoriesRequest),
            switchMap(() =>
                this.bibleVerseCategoriesService.readBibleVerseCategories().pipe(
                    map((categories) => readBibleVerseCategoriesSuccess({ categories })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error reading Bible verse categories', error);
                        return of(readBibleVerseCategoriesFailure({ error }));
                    })
                )
            )
        )
    )

    // Read one
    readBibleVerseCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(readBibleVerseCategoryRequest),
            mergeMap(({ id }) =>
                this.bibleVerseCategoriesService.readBibleVerseCategory(id).pipe(
                    map((category) => readBibleVerseCategorySuccess({ category })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error reading Bible verse category', error);
                        return of(readBibleVerseCategoryFailure({ error }));
                    })
                )
            )
        )
    )

    // Update
    updateBibleVerseCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateBibleVerseCategoryRequest),
            mergeMap(({ request }) =>
                this.bibleVerseCategoriesService.updateBibleVerseCategory(request).pipe(
                    map((category) => updateBibleVerseCategorySuccess({ category })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error updating Bible verse category', error);
                        return of(updateBibleVerseCategoryFailure({ error }));
                    })
                )
            )
        )
    )

    // Delete
    deleteBibleVerseCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBibleVerseCategoryRequest),
            mergeMap(({ id }) =>
                this.bibleVerseCategoriesService.deleteBibleVerseCategory(id).pipe(
                    map((response) => deleteBibleVerseCategorySuccess({ id: response.id })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error deleting Bible verse category', error);
                        return of(deleteBibleVerseCategoryFailure({ error }));
                    })
                )
            )
        )
    )
}

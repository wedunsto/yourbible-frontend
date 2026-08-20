// Calls the create Bible study note service
// Bridges the gap between the NgRx store and the back-end

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createBibleStudyNoteFailure, createBibleStudyNoteRequest, createBibleStudyNoteSuccess } from "./create.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CreateBibleStudyNote } from "../../../services/bible-study-notes/create-bible-study-note/create-bible-study-note.service";

@Injectable()
export class CreateBibleStudyNoteEffects {
    constructor(
        private actions$: Actions,
        private createBibleStudyNoteService: CreateBibleStudyNote,
        private router: Router
    ){}

    // Main effect: Bridge the store and back-end
    createBibleStudyNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createBibleStudyNoteRequest), // Listen for the create Bible study note action
            switchMap(({ request }) => 
                this.createBibleStudyNoteService.createBibleStudyNote(request).pipe(
                    // Map the back-end response to another action
                    // Sending the response to store the user's collective Bible study notes
                    map((response) => createBibleStudyNoteSuccess({ response })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error creating Bible study note', error);
                        return of (
                            createBibleStudyNoteFailure({ error })
                        );
                    })
                )
            )
        )
    )

    // Navigate to home if the response is successful
    // Skip navigation when the note was created from the AI Bible Verse Recommendation page,
    // which shows the created note as a card in place rather than redirecting to home
    navigateOnCreateSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(createBibleStudyNoteSuccess),
                tap(() => {
                    if (!this.router.url.startsWith('/ai-bible-verse-recommendation')) {
                        this.router.navigate(['/home']);
                    }
                })
            ),
            { dispatch: false }
    )
}
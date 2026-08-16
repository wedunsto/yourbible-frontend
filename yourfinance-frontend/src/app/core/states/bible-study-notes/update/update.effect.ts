// Calls the update Bible study note service
// Bridges the gap between the NgRx store and the back-end

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { updateBibleStudyNoteFailure, updateBibleStudyNoteRequest, updateBibleStudyNoteSuccess } from "./update.actions";
import { UpdateBibleStudyNote } from "../../../services/bible-study-notes/update-bible-study-notes/update-bible-study-note.service";

@Injectable()
export class UpdateBibleStudyNoteEffects {
    constructor(
        private actions$: Actions,
        private updateBibleStudyNoteService: UpdateBibleStudyNote,
        private router: Router
    ) {}

    // Main effect: Bridge the store and back-end
    updateBibleStudyNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateBibleStudyNoteRequest), // Listen for the update Bible study note action
            switchMap(({ request }) =>
                this.updateBibleStudyNoteService.updateBibleStudyNote(request).pipe(
                    // Map the back-end response to another action
                    // Sending the response to update the note in the user's collective Bible study notes
                    map((response) => updateBibleStudyNoteSuccess({ response })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error updating Bible study note', error);
                        return of(
                            updateBibleStudyNoteFailure({ error })
                        );
                    })
                )
            )
        )
    )

    // Navigate to home if the response is successful
    navigateOnUpdateSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateBibleStudyNoteSuccess),
                tap(() => this.router.navigate(['/home']))
            ),
            { dispatch: false }
    )
}

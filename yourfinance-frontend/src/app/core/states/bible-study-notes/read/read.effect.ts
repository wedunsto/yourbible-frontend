// Calls the read Bible study notes service
// Bridges the gap between the NgRx store and the back-end

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ReadBibleStudyNotes } from "src/app/core/services/bible-study-notes/read-bible-study-notes/read-bible-study-notes";
import { readBibleStudyNotesFailure, readBibleStudyNotesRequest, readBibleStudyNotesSuccess } from "./read.actions";

@Injectable()
export class ReadBibleStudyNotesEffects {
    constructor(
        private actions$: Actions,
        private readBibleStudyNotesService: ReadBibleStudyNotes
    ) {}

    // Main effect: Bridge the store and back-end
    readBibleStudyNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(readBibleStudyNotesRequest), // Listen for the read Bible study notes action
            switchMap(({ request }) =>
                this.readBibleStudyNotesService.readBibleStudyNotes(request).pipe(
                    // Map the back-end response to another action
                    // Sending the response to store the user's collective Bible study notes
                    map((response) => readBibleStudyNotesSuccess({ response })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error reading Bible study notes', error);
                        return of(
                            readBibleStudyNotesFailure({ error })
                        );
                    })
                )
            )
        )
    )
}

// Calls the delete Bible study note service
// Bridges the gap between the NgRx store and the back-end

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { deleteBibleStudyNoteFailure, deleteBibleStudyNoteRequest, deleteBibleStudyNoteSuccess } from "./delete.actions";
import { DeleteBibleStudyNote } from "../../../services/bible-study-notes/delete-bible-study-notes/delete-bible-study-note.service";

@Injectable()
export class DeleteBibleStudyNoteEffects {
    constructor(
        private actions$: Actions,
        private deleteBibleStudyNoteService: DeleteBibleStudyNote
    ) {}

    // Main effect: Bridge the store and back-end
    deleteBibleStudyNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBibleStudyNoteRequest), // Listen for the delete Bible study note action
            switchMap(({ request }) =>
                this.deleteBibleStudyNoteService.deleteBibleStudyNote(request).pipe(
                    // Map the back-end response to another action
                    // Sending the response to remove the deleted note from the user's collective Bible study notes
                    map((response) => deleteBibleStudyNoteSuccess({ response })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error deleting Bible study note', error);
                        return of(
                            deleteBibleStudyNoteFailure({ error })
                        );
                    })
                )
            )
        )
    )
}

// app/core/states/bible-study-notes/update/update.actions.ts
import { createAction, props } from "@ngrx/store";
import { UpdateBibleStudyNoteRequest, UpdateBibleStudyNoteResponse } from "../../../services/bible-study-notes/update-bible-study-notes/update-bible-study-note.service";

// Request: update Bible study note
export const updateBibleStudyNoteRequest = createAction(
	'[BibleStudy] Update Bible Study Note Request',
	props<{ request: UpdateBibleStudyNoteRequest }>()
);

// Response: Success response from the back-end
export const updateBibleStudyNoteSuccess = createAction(
	'[BibleStudy] Update Bible Study Note Success',
	props<{ response: UpdateBibleStudyNoteResponse }>()
);

// Response: Failure response from the back-end
export const updateBibleStudyNoteFailure = createAction(
	'[BibleStudy] Update Bible Study Note Failure',
	props<{ error: unknown }>()
);

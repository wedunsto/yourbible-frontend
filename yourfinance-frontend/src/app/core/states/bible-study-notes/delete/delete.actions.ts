// app/core/states/bible-study-notes/delete/delete.actions.ts
import { createAction, props } from "@ngrx/store";
import { DeleteBibleStudyNoteRequest, DeleteBibleStudyNoteResponse } from "../../../services/bible-study-notes/delete-bible-study-notes/delete-bible-study-note.service";

// Request: delete Bible study note
export const deleteBibleStudyNoteRequest = createAction(
	'[BibleStudy] Delete Bible Study Note Request',
	props<{ request: DeleteBibleStudyNoteRequest }>()
);

// Response: Success response from the back-end
export const deleteBibleStudyNoteSuccess = createAction(
	'[BibleStudy] Delete Bible Study Note Success',
	props<{ response: DeleteBibleStudyNoteResponse }>()
);

// Response: Failure response from the back-end
export const deleteBibleStudyNoteFailure = createAction(
	'[BibleStudy] Delete Bible Study Note Failure',
	props<{ error: unknown }>()
);

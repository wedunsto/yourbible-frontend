// app/core/states/bible-study-notes/read/read.actions.ts
import { createAction, props } from "@ngrx/store";
import { ReadBibleStudyNotesRequest, ReadBibleStudyNotesResponse } from "../../../services/bible-study-notes/read-bible-study-notes/read-bible-study-notes";

// Request: read Bible study notes
export const readBibleStudyNotesRequest = createAction(
	'[BibleStudy] Read Bible Study Notes Request',
	props<{ request: ReadBibleStudyNotesRequest }>()
);

// Response: Success response from the back-end
export const readBibleStudyNotesSuccess = createAction(
	'[BibleStudy] Read Bible Study Notes Success',
	props<{ response: ReadBibleStudyNotesResponse }>()
);

// Response: Failure response from the back-end
export const readBibleStudyNotesFailure = createAction(
	'[BibleStudy] Read Bible Study Notes Failure',
	props<{ error: unknown }>()
);

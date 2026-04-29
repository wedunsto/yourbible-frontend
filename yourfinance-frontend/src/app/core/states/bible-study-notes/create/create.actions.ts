// app/core/states/bible-study-notes/create.actions.ts
import { createAction, props } from "@ngrx/store";
import { CreateBibleStudyNoteRequest, CreateBibleStudyNoteResponse } from "src/app/core/services/bible-study-notes/create-bible-study-note/create-bible-study-note.service";

// Request: create Bible study note
export const createBibleStudyNoteRequest = createAction(
	'[BibleStudy] Create Bible Study Note Request',
	props<{ request: CreateBibleStudyNoteRequest }>()
);

// Response: Success resposne from the back-end
export const createBibleStudyNoteSuccess = createAction(
	'[BibleStudy] Create Bible Study Note Success',
	props<{ response: CreateBibleStudyNoteResponse }>()
);

// Resposne Failure response from the back-end
export const createBibleStudyNoteFailure = createAction(
	'[BibleStudy] Create Bible Study Note Failure',
	props<{ error: unknown }>()
);
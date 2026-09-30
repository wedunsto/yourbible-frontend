// app/core/states/bible-verse-categories/bible-verse-categories.actions.ts
import { createAction, props } from "@ngrx/store";
import {
	BibleVerseCategoryResponse,
	CreateBibleVerseCategoryRequest,
	UpdateBibleVerseCategoryRequest
} from "../../services/bible-verse-categories/bible-verse-categories.service";

// Request: create a Bible verse category
export const createBibleVerseCategoryRequest = createAction(
	'[BibleVerseCategories] Create Bible Verse Category Request',
	props<{ request: CreateBibleVerseCategoryRequest }>()
);

// Response: Success response from the back-end
export const createBibleVerseCategorySuccess = createAction(
	'[BibleVerseCategories] Create Bible Verse Category Success',
	props<{ category: BibleVerseCategoryResponse }>()
);

// Response: Failure response from the back-end
export const createBibleVerseCategoryFailure = createAction(
	'[BibleVerseCategories] Create Bible Verse Category Failure',
	props<{ error: unknown }>()
);

// Request: read every Bible verse category belonging to the logged-in user
export const readBibleVerseCategoriesRequest = createAction(
	'[BibleVerseCategories] Read Bible Verse Categories Request'
);

// Response: Success response from the back-end
export const readBibleVerseCategoriesSuccess = createAction(
	'[BibleVerseCategories] Read Bible Verse Categories Success',
	props<{ categories: BibleVerseCategoryResponse[] }>()
);

// Response: Failure response from the back-end
export const readBibleVerseCategoriesFailure = createAction(
	'[BibleVerseCategories] Read Bible Verse Categories Failure',
	props<{ error: unknown }>()
);

// Request: read a single Bible verse category
export const readBibleVerseCategoryRequest = createAction(
	'[BibleVerseCategories] Read Bible Verse Category Request',
	props<{ id: string }>()
);

// Response: Success response from the back-end
export const readBibleVerseCategorySuccess = createAction(
	'[BibleVerseCategories] Read Bible Verse Category Success',
	props<{ category: BibleVerseCategoryResponse }>()
);

// Response: Failure response from the back-end
export const readBibleVerseCategoryFailure = createAction(
	'[BibleVerseCategories] Read Bible Verse Category Failure',
	props<{ error: unknown }>()
);

// Request: rename a Bible verse category
export const updateBibleVerseCategoryRequest = createAction(
	'[BibleVerseCategories] Update Bible Verse Category Request',
	props<{ request: UpdateBibleVerseCategoryRequest }>()
);

// Response: Success response from the back-end
export const updateBibleVerseCategorySuccess = createAction(
	'[BibleVerseCategories] Update Bible Verse Category Success',
	props<{ category: BibleVerseCategoryResponse }>()
);

// Response: Failure response from the back-end
export const updateBibleVerseCategoryFailure = createAction(
	'[BibleVerseCategories] Update Bible Verse Category Failure',
	props<{ error: unknown }>()
);

// Request: delete a Bible verse category
export const deleteBibleVerseCategoryRequest = createAction(
	'[BibleVerseCategories] Delete Bible Verse Category Request',
	props<{ id: string }>()
);

// Response: Success response from the back-end
export const deleteBibleVerseCategorySuccess = createAction(
	'[BibleVerseCategories] Delete Bible Verse Category Success',
	props<{ id: string }>()
);

// Response: Failure response from the back-end
export const deleteBibleVerseCategoryFailure = createAction(
	'[BibleVerseCategories] Delete Bible Verse Category Failure',
	props<{ error: unknown }>()
);

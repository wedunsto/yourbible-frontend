import { createAction, props } from '@ngrx/store';

// Describes what occurs when a username existence is checked
// Front-end checks if the user exists
export const userExistsChecked = createAction(
    '[Auth API] Check User Exists',
    props<{ username: string }>()
);

// True: Go to login screen
// False: Go to register screen
export const userExistsResult = createAction(
    '[Auth API] User Exists Result',
    props<{ username: string; exists: boolean }>()
);
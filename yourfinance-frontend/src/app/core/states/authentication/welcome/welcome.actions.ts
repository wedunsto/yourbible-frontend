import { createAction, props } from '@ngrx/store';

// Describes what occurs when a username existence is checked
// True: Go to login screen
// False: Go to register screen
export const userExistsChecked = createAction(
    '[Auth API] User Exists Result',
    props<{ username: string; exists: boolean }>()
);
// Describe what occurs when a user registers a new account
// Front-end sends request to the back-end

import { createAction, props } from "@ngrx/store";

// Request: To persist account credentials
export const accountCreated = createAction(
    '[Auth API] Account Created',
    props<{ username: string, password: string}>()
);

// Response: success or failure response from the back-end
export const accountCreatedResult = createAction(
    '[Auth API] Account Created Response',
    props<{ username: string, accountStatus: string }>()
);
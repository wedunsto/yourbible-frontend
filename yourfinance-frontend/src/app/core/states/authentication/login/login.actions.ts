// Describe what occurs when a user logins into an existing account
// Front-end sends request to the back-end

import { createAction, props } from "@ngrx/store";

// Request: Login with credentials
export const accountAuthenticatedRequest = createAction(
    '[Auth API] Account Authenticated Request',
    props<{ username: string, password: string}>()
);

// Response: Success response from the back-end
export const accountAuthenticatedSuccess = createAction(
  '[Login] Account Authenticated Success',
  props<{ accessToken: string; accountStatus: string }>()
);

// Reponse: Failure response from the back-end
export const accountAuthenticatedFailure = createAction(
  '[Login] Account Authenticated Failure',
  props<{ error: unknown }>()
);
// Describe what occurs when a user logins into an existing account
// Front-end sends request to the back-end

import { createAction, props } from "@ngrx/store";

// Request: Login with credentials
export const accountAuthenticatedRequest = createAction(
    '[Auth API] Account Authenticated Request',
    props<{ username: string, password: string}>()
);

// Response: Success or failure response from the back-end
export const accountAuthenticatedResponse = createAction(
    '[Auth API] Account Authenticated Response',
    props<{accessToken: string, accountStatus: string}>()
);
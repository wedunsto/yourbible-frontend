// Calls the login services and bridges the gap between the NgRx store and the back-end

import { catchError, map, of, switchMap, tap } from "rxjs";
import { accountAuthenticatedRequest, accountAuthenticatedSuccess, accountAuthenticatedFailure } from "./login.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginResponse, LoginService } from "../../../services/authentication/login/login.service";

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private router: Router
    ){}

    // Main effect: Bridges the store and back-end
    loginAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(accountAuthenticatedRequest), // Listen for the account authentication action
            switchMap(({ username, password }) =>
                this.loginService.loginToAccount({ username, password }).pipe(
                    // Map the back-end response to another action
                    // Sending the response to authenticating an existing account to the front-end
                    map(({ accessToken, accountStatus, username }: LoginResponse) => accountAuthenticatedSuccess({ accessToken, accountStatus, username })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error authenticating new account', error);
                        return of(
                            accountAuthenticatedFailure({ error })
                        );
                    })
                )
            )
        )
    )

    // Navigate to home if the response is successful
    navigateOnLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountAuthenticatedSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );
}
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RegisterResponse, RegisterService } from "src/app/core/services/authentication/register/register.service";
import { accountCreated, accountCreatedResult } from "./register.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class RegisterEffects {
    constructor(
        private actions$: Actions,
        private registerService: RegisterService
    ){}

    // Main effect: bridges the store and back-end
    registerAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(accountCreated), // Listen for the account created action
            switchMap(({ username, password}) =>
                this.registerService.registerAccount({ username, password }).pipe(
                    // Map the back-end result to another action,
                    // Sending the response to creating a new account to the front-end
                    map(({ username, accountStatus }: RegisterResponse) => accountCreatedResult({ username, accountStatus })),
                    // TODO: Handle errors
                    catchError((error) => {
                        console.error('Error creating new account', error);
                        return of(
                            accountCreatedResult({username: "error", accountStatus: "error"})
                        );
                    })
                )
            )
        )
    )
}
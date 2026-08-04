import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userExistsChecked, userExistsResult } from "./welcome.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UserExistsService } from "../../../services/user-exists/user-exists.service";

@Injectable()
export class WelcomeEffects {
    constructor(
        private actions$: Actions,
        private userExistsService: UserExistsService
    ) {}

    // Main effect: bridges the store and back-end
  checkUserExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userExistsChecked), // Listen for the checked action
      switchMap(({ username }) =>
        this.userExistsService.getUserExists(username).pipe(
          // Map the backend result to another action,
          // Sending the user and exists status to the frontend
          map((destination) => userExistsResult({ username, destination })),
          // TODO: Handle errors
          catchError((error) => {
            console.error('Error checking user existence:', error);
            return of(
              userExistsResult({ username, destination: '' })
            );
          })
        )
      )
    )
  );

    // Persist the username so it survives a page refresh
    persistUsername$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userExistsResult),
                tap(({ username }) => localStorage.setItem('username', username))
            ),
        { dispatch: false }
    );
}
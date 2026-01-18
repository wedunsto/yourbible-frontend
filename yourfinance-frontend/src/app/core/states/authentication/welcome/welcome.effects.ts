import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userExistsChecked, userExistsResult } from "./welcome.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserExistsService } from "src/app/core/services/user-exists/user-exists.service";

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
          map((exists) => userExistsResult({ username, exists })),
          // TODO: Handle errors
          catchError((error) => {
            console.error('Error checking user existence:', error);
            return of(
              userExistsResult({ username, exists: false })
            );
          })
        )
      )
    )
  );
}
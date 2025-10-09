import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserExistsService } from "src/app/core/services/authentication/userExists.service";
import { userExistsChecked } from "./welcome.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class WelcomeEffects {
    constructor(
        private actions$: Actions,
        private userExistsService: UserExistsService
    ) {}

    // Main effect: bridges the store and backend
  checkUserExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userExistsChecked), // Listen for action with { username }
      switchMap(({ username }) =>
        this.userExistsService.getUserExists(username).pipe(
          // Map the backend result to another action
          map((exists) => userExistsChecked({ username, exists })),
          // TODO: Handle errors
          catchError((error) => {
            console.error('Error checking user existence:', error);
            return of(
              userExistsChecked({ username, exists: false })
            );
          })
        )
      )
    )
  );
}
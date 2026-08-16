---
name: update-bible-study-note
description: Create the `update-bible-study-note.service.ts` service in `src/app/core/services/bible-study-notes/update-bible-study-notes`. UpdateBibleStudyNote sends an http PATCH request to `${this.base}${this.bibleStudyNotesEndpoint}?id=${request.id}`, with the BibleStudyNote body from `src/app/core/models/`. Creates the NgRx files to provide state management for maintaining Bible study notes in `src/app/core/states/bible-study-notes/update`. `update.action.ts` describes what occurs when a user updates a Bible study note. `update.effect.ts` calls the UpdateBibleStudyNote service function. Updates the `bible-study-notes.feature.ts` file in `src/app/core/states/bible-study-notes`. On updateBibleStudyNoteSuccess, update the bibleStudyNotes state to update the Bible study note with the matching id. Updates `app.config.ts` in `src/app/`. Provides the UpdateBibleStudyNote effect. Creates the update Bible study note form in `src/app/update-bible-study-note/`. Creates the update Bible study note button component in `src/app/home/components/update-bible-study-note`. On click, dispatches the updateBibleStudyNoteRequest action. Places the update Bible study note button in the bottom left corner of the BibleStudyNoteCard component.
---

## Stack conventions
- Ionic Angular
- Layering: Ionic page → Ionic component → NgRx store → service
- BibleStudyNote ids are `string`

## Pattern to follow
- update-bible-study-note service matches the same style as get-bible-study-notes service
- NgRx store files for update match the NgRx store files for read
- update-bible-study-note button component matches the same style as delete-bible-study-note
- update-bible-study-note form looks exactly like create-bible-study-note

## Process
1. Create `updateBibleStudyNote(id: string, updates: BibleStudyNote): Observable<BibleStudyNote>` in update-bible-study-note.service.ts
   
2. Create `UpdateBibleStudyNoteEffects` class in update.effect.ts. Call `updateBibleStudyNote(id: string, updates: BibleStudyNote)`. Navigate to /home if the response is successful.
   
3. Update the existing `BibleStudyFeauture` to update on updateBibleStudyNoteSuccess. find the Bible study note with the matching id, and give it the new BibleStudyNote object.
   
4. Create `updateBibleStudyNoteRequest`, `updateBibleStudyNoteSuccess`, and `updateBibleStudyNoteFailure` in update.actions.ts
   
5. Create update-bible-study-note form just like the create-bible-study-note form. Use input<string> for the Bible study not id. Use the `selectBibleStudyNotes` selector when the page loads to get all the Bible study notes. Store the BibleStudyNote object with the matching Bible study note id from the input. Pre-populate the form with the information from the BibleStudyNote.
   
6. Create `UpdateBibleStudyNoteComponent` in update-bible-study. Use input<string> for the id. Use IonButton to render the button to update the Bible study note. On click, navigate to the updateBibleStudyNote page, passing the Bible study note id.
   
7. Import `UpdateBibleStudyNoteComponent` into `BibleStudyNoteCardComponent`. Render the button in the bottom left corner of the `BibleStudyNoteCardComponent` IonCard. Pass the `BibleStudyNoteCardComponent` note id value into `UpdateBibleStudyNoteComponent`.
   
8. On click, `UpdateBibleStudyNoteComponent` will dispatch the `updateBibleStudyNoteRequest` action.
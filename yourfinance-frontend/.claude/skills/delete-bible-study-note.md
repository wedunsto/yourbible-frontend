---
name: delete-bible-study-note
description: Create the `delete-bible-study-note.service.ts` service in `src/app/core/services/bible-study-notes/delete-bible-study-notes`. DeleteBibleStudyNote sends an http DELETE request to `${this.base}${this.bibleStudyNotesEndpoint}?id=${request.id}`. Creates the NgRx files to provide state management for maintaining Bible study notes in `src/app/core/states/bible-study-notes/delete`. `delete.action.ts` describes what occurs when a user deletes a Bible study note. `delete.effect.ts` calls the DeleteBibleStudyNote service function. Updates the `bible-study-notes.feature.ts` file in `src/app/core/states/bible-study-notes`. When deleteBibleStudyNoteSuccess, update the bibleStudyNotes state to remove the Bible study note with the matching id. Updates `app.config.ts` in `src/app/`. Provides the DeleteBibleStudyNote effect. Creates the delete Bible study note button component in `src/app/home/components/delete-bible-study-note`. On click, dispatches the deleteBibleStudyNoteRequest action. Places the delete Bible study note button in the bottom right corner of the BibleStudyNoteCard component.
---

## Stack conventions
- Ionic Angular
- Layering: Ionic page → Ionic component → NgRx store → service
- BibleStudyNote ids are `string`

## Pattern to follow
- delete-bible-study-note service matches the same style as get-bible-study-notes service
- NgRx store files for delete match the NgRx store files for read
- delete-bible-study-note button component matches the same style as bible-study-note-card

## Process
1. Create `deleteBibleStudyNote(id: string): Observable<BibleStudyNoteId>` in delete-bible-study-note.service.ts
   
2. Create `DeleteBibleStudyNoteEffects` class in delete.effect.ts. Call `deleteBibleStudyNote(id: string)`. Do not navigate anywhere. This service deletes the Bible study note with the matching id string.
   
3. Update the existing `BibleStudyFeauture` to update on deleteBibleStudyNoteSuccess
   
4. Create `deleteBibleStudyNoteRequest`, `deleteBibleStudyNoteSuccess`, and `deleteBibleStudyNoteFailure` in delete.actions.ts
   
5. Create `DeleteBibleStudyNoteComponent` in delete-bible-study. Use input<string> for the id. Use IonButton to render the buttion to delete the Bible study note.
   
6. Import `DeleteBibleStudyNoteComponent` into `BibleStudyNoteCardComponent`. Render the button in the bottom right corner of the `BibleStudyNoteCardComponent` IonCard. Pass the `BibleStudyNoteCardComponent` note id value into `DeleteBibleStudyNoteComponent`.
   
7. On click, `DeleteBibleStudyNoteComponent` will dispatch the `deleteBibleStudyNoteRequest` action.
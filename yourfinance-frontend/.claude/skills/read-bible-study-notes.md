---
name: render-bible-study-notes
description: Creates the service to get Bible study notes from ${this.base}${this.bibleStudyNotesEndpoint}?username=${username} based on the user's username in /src/app/core/services/bible-study-notes/get-bible-study-notes/get-bible-study-notes.service.ts. The service returns an Observable array of BibleStudyNote from src/app/core/models/BibleStudyNote.model. Creates the NgRx store action and effect in /src/app/core/states/bible-study-notes/read. NgRx files include read.actions.ts and read.effect.ts. Wires ReadBibleStudyNotesEffects in `app.config.ts`. Creates the Ionic component in /src/app/components/bible-study-note-card. Ionic component files include bible-study-note-card.component.html, bible-study-note-card.component.ts, bible-study-note-card.component.scss, and bible-study-note-card.component.spec.ts. Creates the Ionic component in /src/app/components/read-bible-study-notes. Ionic component files include read-bible-study-notes.component.html, read-bible-study-notes.component.ts, read-bible-study-notes.component.scss, and read-bible-study-notes.component.spec.ts. Enables home.page.html to dispaly read-bible-study-notes component.
---

## Stack conventions
- Ionic Angular
- Layering: Ionic page → Ionic component → NgRx store → service
- usernames are `string`
  
## Pattern to follow
- get-bible-study-notes service matches the same style as create-bible-study-note service
- NgRx store files for read match the NgRx store files for create
- bible-study-note-card matches the same style as create-bible-study-note page
  
## Process
1. Create `getBibleStudyNotes(username: string): Observable<BibleStudyNote>` in get-bible-study-notes.service.ts

2. Create `ReadBibleStudyNotesEffects` class in read.effect.ts. Call `getBibleStudyNotes(username: string)`. Do not navigate anywhere. This service gets the Bible study notes to render on the ReadBibleStudyNotesComponent on the home page.

3. Import `ReadBibleStudyNotesEffects` into app.config.ts. Add `ReadBibleStudyNotesEffects`to the provideEffects array.
   
4. Update the existing `BibleStudyFeature` to update on readBibleStudyNotesSuccess
   
5. Create `readBibleStudyNotesRequest`, `readBibleStudyNotesSuccess`, and `readBibleStudyNotesFailure` in bible-study-notes.actions.ts
   
6. Create `BibleStudyNoteCardComponent` in bible-study-note-card. Use input<string> for the title, book, verses, and notes. Use input<number> for the chapter, and input<string> for created_at. Use IonCard to render the input values.
   
7. Create `ReadBibleStudyNotesComponent` in read-bible-study-notes. Select the user's username using the selector `selectUsername` from '/core/states/authentication/welcome/welcome.feature'. Dispatch the readBibleStudyNotesRequest action within the `ngOnInit` function to get an array of BibleStudyNote when ReadBibleStudyNotesComponent initializes. Use @for  to loop over the array of BibleStudyNote in read-bible-study-notes.component.html. Create BibleStudyNoteCardComponent objects in the loop and set the inputs for title, book, verses, study_categories, created_at, and notes.
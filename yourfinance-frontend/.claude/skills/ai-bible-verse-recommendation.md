---
name: ai-bible-verse-recommendation
description: Create the `/recommend` endpoint in the environment variable in `environment.ts`. Create the `BibleVerseRecommendation` service in `src/app/core/service/bible-verse-recommendations/bible-verse-recommendations.service.ts`. BibleVerseRecommendation dispatches the readBibleStudyNotesRequest action to get all the user's Bible study notes, then stores an array of all the Bible study note's study_categories strings into 1 array of strings. BibleVerseRecommendation sends an http POST request to `$this.base}${this.bibleVerseRecommendationEndpoint}` with the array of Bible study_categories and the username, where this.bibleVerseRecommendationEndpoint is environment.endpoints.recommend. The response contains a category, Bible verse object containing the Book, Chapter, and Verse, along with text containing the Bible verse text. Store this information into a BibleStudyNote object where the notes section is the Bible verse text, and created_at is today's date. The title will be Recommendation on {category}. username is the current username. id is a uuidv4 id. append the category to study_categories array. Create the BibleStudyNote object in the NgRx store using CreateBibleStudyActions.createBibleStudyNoteRequest, where the request payload is the BibleStudyNote created from the service response, Create a page called AI Bible Verse Recommendation. Add a single button called Get Bible Verse Recommendation. Add space below the button, so when the back-end responds to the request from the Get Bible Verse Recommendation button, a card just like app-bible-study-note-card appears populated with the BibleStudyNote object created from the service response. Update will navigate to /update-bible-study-note/{id of the BibleStudyNote created in the BibleVerseRecommendation service}). The DELETE button will dispatch the  deleteBibleStudyNoteRequest action. Add a link to AI Bible Verse Recommendation to the home-menu.

---

## Stack conventions
- Ionic Angular
- Layering: Ionic page → Ionic component → NgRx store → service
- BibleStudyNote ids are `string`

## Pattern to follow
- bible-verse-recommendations service matches the same style as get-bible-study-notes service
- Get Bible Verse Recommendation button matches the same style as bible-study-note-card

## Process
1. Create `BibleVerseRecommendation(username: string, study_categories: BibleStudyCategory[]): Observable<BibleStudyNote>` in bible-verse-recommendations.service.ts
   
2. Create a page called AI Bible Verse Recommendation
   
3. Add the Get Bible Verse Recommendation button to the AI Bible Verse Recommendation page
   
4. When the BibleVerseRecommendation responds, create the app-bible-study-note-card below the Get Bible Verse Recommendation button
   
5. Create `DeleteBibleStudyNoteEffects` class in delete.effect.ts. Call `deleteBibleStudyNote(id: string)`. Do not navigate anywhere. This service deletes the Bible study note with the matching id string.
   
6. On click, UPDATE will navigate to /update-bible-study-note/{id of the BibleStudyNote created in the BibleVerseRecommendation service})
   
7. On click, DELETE will dispatch the  deleteBibleStudyNoteRequest action with the id of the BibleStudyNote created from the BibleVerseRecommendation service
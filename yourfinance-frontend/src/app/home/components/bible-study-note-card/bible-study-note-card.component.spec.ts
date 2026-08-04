import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BibleStudyNoteCardComponent } from './bible-study-note-card.component';
import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';

describe('BibleStudyNoteCardComponent', () => {
  let component: BibleStudyNoteCardComponent;
  let fixture: ComponentFixture<BibleStudyNoteCardComponent>;

  const note: BibleStudyNote = {
    username: 'jdoe',
    book: 'John',
    chapter: 3,
    verses: '16',
    study_categories: ['Hope'],
    title: 'God so loved the world',
    notes: 'For God so loved the world...',
    created_at: new Date()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), BibleStudyNoteCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BibleStudyNoteCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('note', note);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

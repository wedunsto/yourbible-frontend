import { TestBed } from '@angular/core/testing';

import { ReadBibleStudyNotes } from './read-bible-study-notes';

describe('ReadBibleStudyNotes', () => {
  let service: ReadBibleStudyNotes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadBibleStudyNotes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

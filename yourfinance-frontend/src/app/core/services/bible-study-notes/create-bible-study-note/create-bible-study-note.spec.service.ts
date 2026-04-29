import { TestBed } from '@angular/core/testing';

import { CreateBibleStudyNote } from './create-bible-study-note.service';

describe('CreateBibleStudyNote', () => {
  let service: CreateBibleStudyNote;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBibleStudyNote);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

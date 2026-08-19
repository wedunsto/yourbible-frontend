import { TestBed } from '@angular/core/testing';

import { BibleVerseRecommendation } from './bible-verse-recommendations.service';

describe('BibleVerseRecommendation', () => {
  let service: BibleVerseRecommendation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleVerseRecommendation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

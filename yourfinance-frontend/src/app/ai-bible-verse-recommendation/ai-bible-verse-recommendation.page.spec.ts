import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiBibleVerseRecommendationPage } from './ai-bible-verse-recommendation.page';

describe('AiBibleVerseRecommendationPage', () => {
  let component: AiBibleVerseRecommendationPage;
  let fixture: ComponentFixture<AiBibleVerseRecommendationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiBibleVerseRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

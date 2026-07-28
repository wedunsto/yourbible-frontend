import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBibleStudyNotePage } from './create-bible-study-note.page';

describe('CreateBibleStudyNotePage', () => {
  let component: CreateBibleStudyNotePage;
  let fixture: ComponentFixture<CreateBibleStudyNotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBibleStudyNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

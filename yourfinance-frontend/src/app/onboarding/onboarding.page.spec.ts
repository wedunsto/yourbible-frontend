import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MAX_CATEGORIES, OnboardingPage, toCategoryNames } from './onboarding.page';
import { createBibleVerseCategoryRequest } from '../core/states/bible-verse-categories/bible-verse-categories.actions';

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), provideRouter([])]
    });
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with a single category input', () => {
    expect(component.categories().length).toBe(1);
  });

  it('should add a category input', () => {
    component.addCategory();
    expect(component.categories().length).toBe(2);
  });

  it(`should not add more than ${MAX_CATEGORIES} category inputs`, () => {
    for (let i = 0; i < MAX_CATEGORIES + 5; i++) {
      component.addCategory();
    }
    expect(component.categories().length).toBe(MAX_CATEGORIES);
    expect(component.canAddCategory()).toBeFalse();
  });

  it('should dispatch a create request for each category on submit', () => {
    component.addCategory();
    component.categories().setValue(['Hope', 'Fear']);

    component.submitOnboarding();

    expect(store.dispatch).toHaveBeenCalledWith(createBibleVerseCategoryRequest({ request: { category: 'Hope' } }));
    expect(store.dispatch).toHaveBeenCalledWith(createBibleVerseCategoryRequest({ request: { category: 'Fear' } }));
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should route home after dispatching the last category', () => {
    const calls: string[] = [];
    (store.dispatch as jasmine.Spy).and.callFake(() => calls.push('dispatch'));
    (router.navigate as jasmine.Spy).and.callFake(() => calls.push('navigate'));
    component.addCategory();
    component.categories().setValue(['Hope', 'Fear']);

    component.submitOnboarding();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(calls).toEqual(['dispatch', 'dispatch', 'navigate']);
  });

  it('should not dispatch or route home when only whitespace was entered', () => {
    component.categories().setValue(['   ']);

    component.submitOnboarding();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not dispatch when a category input is empty', () => {
    component.addCategory();
    component.categories().setValue(['Hope', '']);

    component.submitOnboarding();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.categories().at(1).touched).toBeTrue();
  });
});

describe('toCategoryNames', () => {
  it('should trim categories and drop blank and repeated entries', () => {
    expect(toCategoryNames([' Hope ', '   ', 'Fear', 'Hope'])).toEqual(['Hope', 'Fear']);
  });
});

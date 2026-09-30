import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BibleVerseCategories } from './bible-verse-categories.service';
import { selectLoginState } from '../../states/authentication/login/login.feature';
import { environment } from '../../../../environments/environment';

describe('BibleVerseCategories', () => {
  const url = `${environment.apiBaseUrl}${environment.endpoints.categories}`;
  const accessToken = 'test-token';
  const userId = 'user-1';
  let service: BibleVerseCategories;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          selectors: [{ selector: selectLoginState, value: { accessToken, userId, username: 'tester', error: null } }]
        })
      ]
    });
    service = TestBed.inject(BibleVerseCategories);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create a category for the logged-in user with a bearer token', () => {
    service.createBibleVerseCategory({ category: 'Hope' }).subscribe();

    const req = httpTesting.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userId: 'user-1', category: 'Hope' });
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    req.flush({});
  });

  it('should read the logged-in user\'s categories with a bearer token', () => {
    service.readBibleVerseCategories().subscribe();

    const req = httpTesting.expectOne(`${url}?userId=user-1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    req.flush([]);
  });

  it('should read a single category with a bearer token', () => {
    service.readBibleVerseCategory('cat-1').subscribe();

    const req = httpTesting.expectOne(`${url}/cat-1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    req.flush({});
  });

  it('should update a category with a bearer token', () => {
    service.updateBibleVerseCategory({ id: 'cat-1', category: 'Faith' }).subscribe();

    const req = httpTesting.expectOne(`${url}/cat-1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ category: 'Faith' });
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    req.flush({});
  });

  it('should delete a category with a bearer token', () => {
    service.deleteBibleVerseCategory('cat-1').subscribe();

    const req = httpTesting.expectOne(`${url}/cat-1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    req.flush({ id: 'cat-1' });
  });
});

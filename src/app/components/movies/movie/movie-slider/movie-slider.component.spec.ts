import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarMovieComponent } from './similar-movie.component';

describe('SimilarMovieComponent', () => {
  let component: SimilarMovieComponent;
  let fixture: ComponentFixture<SimilarMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastProfileComponent } from './cast-profile.component';

describe('CastProfileComponent', () => {
  let component: CastProfileComponent;
  let fixture: ComponentFixture<CastProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

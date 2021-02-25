import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamtPage } from './camt.page';

describe('CamtPage', () => {
  let component: CamtPage;
  let fixture: ComponentFixture<CamtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

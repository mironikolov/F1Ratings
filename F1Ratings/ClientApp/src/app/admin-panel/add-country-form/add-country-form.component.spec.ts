import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryFormComponent } from './add-country-form.component';

describe('AddCountryFormComponent', () => {
  let component: AddCountryFormComponent;
  let fixture: ComponentFixture<AddCountryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCountryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

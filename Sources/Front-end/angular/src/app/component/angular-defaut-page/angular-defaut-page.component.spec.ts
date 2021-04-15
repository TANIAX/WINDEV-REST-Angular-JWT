import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDefautPageComponent } from './angular-defaut-page.component';

describe('AngularDefautPageComponent', () => {
  let component: AngularDefautPageComponent;
  let fixture: ComponentFixture<AngularDefautPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularDefautPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDefautPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

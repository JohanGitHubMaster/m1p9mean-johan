import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatComponent } from '../plat/plat.component';

import { InscriptionClientComponent } from './inscription-client.component';

describe('InscriptionClientComponent', () => {
  let component: InscriptionClientComponent;
  let fixture: ComponentFixture<InscriptionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionClientComponent,PlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

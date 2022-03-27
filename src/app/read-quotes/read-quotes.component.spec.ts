import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadQuotesComponent } from './read-quotes.component';

describe('ReadQuotesComponent', () => {
  let component: ReadQuotesComponent;
  let fixture: ComponentFixture<ReadQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

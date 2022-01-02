import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCardWithDetailsComponent } from './track-card-with-details.component';

describe('TrackCardWithDetailsComponent', () => {
  let component: TrackCardWithDetailsComponent;
  let fixture: ComponentFixture<TrackCardWithDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCardWithDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCardWithDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

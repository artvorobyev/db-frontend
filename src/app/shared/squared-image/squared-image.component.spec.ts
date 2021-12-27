import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaredImageComponent } from './squared-image.component';

describe('SquaredImageComponent', () => {
  let component: SquaredImageComponent;
  let fixture: ComponentFixture<SquaredImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquaredImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquaredImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

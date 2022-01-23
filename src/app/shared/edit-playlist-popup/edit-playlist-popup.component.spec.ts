import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistPopupComponent } from './edit-playlist-popup.component';

describe('EditPlaylistPopupComponent', () => {
  let component: EditPlaylistPopupComponent;
  let fixture: ComponentFixture<EditPlaylistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlaylistPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlaylistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

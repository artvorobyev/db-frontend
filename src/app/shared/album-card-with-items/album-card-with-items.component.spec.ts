import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCardWithItemsComponent } from './album-card-with-items.component';

describe('AlbumCardWithItemsComponent', () => {
  let component: AlbumCardWithItemsComponent;
  let fixture: ComponentFixture<AlbumCardWithItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCardWithItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCardWithItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

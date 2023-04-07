import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditPostComponent } from './addedit-post.component';

describe('AddeditPostComponent', () => {
  let component: AddeditPostComponent;
  let fixture: ComponentFixture<AddeditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

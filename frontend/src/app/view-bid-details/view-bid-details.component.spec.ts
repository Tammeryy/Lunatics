import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidDetailsComponent } from './view-bid-details.component';

describe('ViewBidDetailsComponent', () => {
  let component: ViewBidDetailsComponent;
  let fixture: ComponentFixture<ViewBidDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBidDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

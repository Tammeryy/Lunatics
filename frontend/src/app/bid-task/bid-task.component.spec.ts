import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidTaskComponent } from './bid-task.component';

describe('BidTaskComponent', () => {
  let component: BidTaskComponent;
  let fixture: ComponentFixture<BidTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatNotifyDialogComponent } from './mat-notify-dialog.component';

describe('MatNotifyDialogComponent', () => {
  let component: MatNotifyDialogComponent;
  let fixture: ComponentFixture<MatNotifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatNotifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatNotifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

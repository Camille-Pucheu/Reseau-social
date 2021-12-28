import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionInscriptionComponent } from './connection-inscription.component';

describe('ConnectionInscriptionComponent', () => {
  let component: ConnectionInscriptionComponent;
  let fixture: ComponentFixture<ConnectionInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

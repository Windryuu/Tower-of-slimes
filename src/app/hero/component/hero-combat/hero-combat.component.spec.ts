import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatComponent } from './hero-combat.component';

describe('HeroCombatComponent', () => {
  let component: HeroCombatComponent;
  let fixture: ComponentFixture<HeroCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

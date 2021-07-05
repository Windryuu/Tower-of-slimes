import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSelectHeroComponent } from './page-select-hero.component';

describe('PageSelectHeroComponent', () => {
  let component: PageSelectHeroComponent;
  let fixture: ComponentFixture<PageSelectHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSelectHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSelectHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListHeroComponent } from './page-list-hero.component';

describe('PageListHeroComponent', () => {
  let component: PageListHeroComponent;
  let fixture: ComponentFixture<PageListHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

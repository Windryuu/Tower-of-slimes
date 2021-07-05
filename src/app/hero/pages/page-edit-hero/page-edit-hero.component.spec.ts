import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditHeroComponent } from './page-edit-hero.component';

describe('PageEditHeroComponent', () => {
  let component: PageEditHeroComponent;
  let fixture: ComponentFixture<PageEditHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

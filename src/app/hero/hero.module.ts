import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { FormHeroComponent } from './component/form-hero/form-hero.component';
import { SharedModule } from '../shared/shared.module';
import { PageListHeroComponent } from './pages/page-list-hero/page-list-hero.component';
import { PageEditHeroComponent } from './pages/page-edit-hero/page-edit-hero.component';
import { HeroCombatComponent } from './component/hero-combat/hero-combat.component';
import { PageSelectHeroComponent } from './pages/page-select-hero/page-select-hero.component';


@NgModule({
  declarations: [
    FormHeroComponent,
    PageListHeroComponent,
    PageEditHeroComponent,
    HeroCombatComponent,
    PageSelectHeroComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    SharedModule
  ]
})
export class HeroModule { }

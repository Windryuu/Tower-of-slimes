import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEditHeroComponent } from './pages/page-edit-hero/page-edit-hero.component';
import { PageListHeroComponent } from './pages/page-list-hero/page-list-hero.component';
import { PageSelectHeroComponent } from './pages/page-select-hero/page-select-hero.component';

const routes: Routes = [
  {path:'',component:PageSelectHeroComponent},
  {path: 'hero/:id',component:PageListHeroComponent},
  {path:'edit/:id',component:PageEditHeroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }

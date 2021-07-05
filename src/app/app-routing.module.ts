import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'herolist',
  loadChildren: () =>
    import('./hero/hero.module').then((m) => m.HeroModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module')
      .then((m) => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

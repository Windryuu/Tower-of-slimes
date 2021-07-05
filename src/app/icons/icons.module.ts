import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconCloseComponent } from './components/icon-close/icon-close/icon-close.component';
import { IconDeleteComponent } from './components/icon-delete/icon-delete/icon-delete.component';
import { IconEditComponent } from './components/icon-edit/icon-edit/icon-edit.component';
import { IconMinusComponent } from './components/icon-minus/icon-minus/icon-minus.component';
import { IconNavComponent } from './components/icon-nav/icon-nav/icon-nav.component';
import { IconPlusComponent } from './components/icon-plus/icon-plus/icon-plus.component';



@NgModule({
  declarations: [
    IconCloseComponent,
    IconDeleteComponent,
    IconEditComponent,
    IconMinusComponent,
    IconNavComponent,
    IconPlusComponent

  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    IconCloseComponent,
    IconDeleteComponent,
    IconEditComponent,
    IconMinusComponent,
    IconNavComponent,
    IconPlusComponent
  ]
})
export class IconsModule { }

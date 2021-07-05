import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './component/ui/ui.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UiComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UiComponent
  ]
})
export class UiModule { }
/*ng generate component ui*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesModule } from '../templates/templates.module';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableLightComponent } from './components/table/table-light/table-light.component';



@NgModule({
  declarations: [
    TableLightComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TemplatesModule,
    IconsModule,
    ReactiveFormsModule,
    TableLightComponent
  ]
})
export class SharedModule { }

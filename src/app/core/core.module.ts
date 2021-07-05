import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { UiModule } from '../ui/ui.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavComponent,
    IconsModule,
    UiModule,
    LoginModule
  ]
})
export class CoreModule { }

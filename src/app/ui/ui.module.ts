import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './../material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiService } from './services/ui.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';


const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatNativeDateModule,
    DemoMaterialModule,
    NgbModule
  ],
  declarations: [FooterComponent, HeaderComponent, LayoutComponent, DashboardLayoutComponent],
  exports: [
    LayoutComponent
  ],
  providers: [
    UiService
  ]
})
export class UiModule { }

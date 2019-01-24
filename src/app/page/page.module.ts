import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './components/page/page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from '../material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const router: Routes = [
  {
    path: 'content/:slug', component: PageComponent
  }
  
];

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    DemoMaterialModule,
    NgbModule,
    RouterModule.forRoot(router)
  ]
})
export class PageModule { }

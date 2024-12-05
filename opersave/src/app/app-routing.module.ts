import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/operation/home/home.component';
import { HomeLogComponent } from './pages/log/home-log/home-log.component';
import { OperationCreateComponent } from './pages/operation/operation-create/operation-create.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'logs',
    component: HomeLogComponent
  },
  {
    path: 'create',
    component: OperationCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

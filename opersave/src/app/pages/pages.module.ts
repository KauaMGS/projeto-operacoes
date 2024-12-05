import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OperationListComponent } from './operation/operation-list/operation-list.component';
import { HomeComponent } from './operation/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { OperationDetailsComponent } from './operation/operation-details/operation-details.component';
import { LogListComponent } from './log/log-list/log-list.component';
import { HomeLogComponent } from './log/home-log/home-log.component';
import { OperationCreateComponent } from './operation/operation-create/operation-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OperationListComponent,
    HomeComponent,
    OperationDetailsComponent,
    LogListComponent,
    HomeLogComponent,
    OperationCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class PagesModule { }

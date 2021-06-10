import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationComponent } from './components/validation/validation.component';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [ValidationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationComponent,
    DialogModule
  ]
})
export class SharedModule { }

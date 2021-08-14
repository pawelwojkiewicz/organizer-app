import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CalendarTileComponent } from './components/calendar-tile/calendar-tile.component';
import { ButtonModule } from 'primeng/button';
import { CalendarDialogComponent } from './components/calendar-dialog/calendar-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [CalendarComponent, HeaderComponent, CalendarTileComponent, CalendarDialogComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ]
})
export class CalendarModule { }

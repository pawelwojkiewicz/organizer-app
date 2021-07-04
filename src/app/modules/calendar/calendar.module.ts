import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CalendarTileComponent } from './components/calendar-tile/calendar-tile.component';


@NgModule({
  declarations: [CalendarComponent, HeaderComponent, CalendarTileComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule
  ]
})
export class CalendarModule { }

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDialogComponent {

  openDayDetails$ = this.calendarService.openDayDetails$;
  openedDay$ = this.calendarService.openedDay$;

  constructor(
    private calendarService: CalendarService
  ) { }

  saveDayDetails(): void {
    this.closeDayDetails();
  }

  closeDayDetails(): void {
    this.calendarService.onOpenDayDetails(false);
  }
}

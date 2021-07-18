import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  currentDate$ = this.calendarService.currentDate$;

  constructor(
    private calendarService: CalendarService
  ) { }

  onPreviousMonth(): void {
    this.calendarService.onPrevMonth();
  }

  onNextMonth(): void {
    this.calendarService.onNextMonth();
  }
}

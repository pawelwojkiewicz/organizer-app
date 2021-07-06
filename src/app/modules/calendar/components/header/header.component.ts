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
export class HeaderComponent implements OnInit {
  currentDate: string;

  ngOnInit(): void {
    this.getCurrentDate();
  }

  constructor(
    private calendarService: CalendarService
  ) { }

  onPreviousMonth(): void {
    this.calendarService.onPrevMonth();
    this.getCurrentDate();
  }

  onNextMonth(): void {
    this.calendarService.onNextMonth();
    this.getCurrentDate();
  }

  getCurrentDate(): void {
    this.calendarService.getCurrentDate()
      .pipe(untilDestroyed(this))
      .subscribe(
        (date: string) => {
          this.currentDate = date;
        }
      );
  }
}

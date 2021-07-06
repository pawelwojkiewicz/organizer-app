import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { Observable, EMPTY } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  user$: Observable<User> = this.authService.user$;
  tasks$: Observable<any>;
  binding: string;
  mark = true;
  daysInMonth: number[];
  currentDay = +this.calendarService.moment.format('D');
  currentDate = this.calendarService.moment.format('MMMM YYYY');
  newDate: string;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private messageService: MessageService,
    private calendarService: CalendarService,
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.tasks$ = this.user$.pipe(
      switchMap(
        (user: User) => {
          if (!user) {
            return EMPTY;
          }
          return this.dataStorageService.getTasks(user);
        }
      ),
      untilDestroyed(this)
    );
    this.setDaysInMonth();
    this.markCurrentDay();
  }

  setDaysInMonth(): void {
    this.calendarService.getCurrentDaysInMonth()
      .pipe(untilDestroyed(this))
      .subscribe(
        (days: number) => {
          this.daysInMonth = [];
          for (let i = 0; i < days; i++) {
            this.daysInMonth.push(i + 1);
          }
        }
      );
  }

  markCurrentDay(): void {
    this.calendarService.currentDate$
      .pipe(untilDestroyed(this))
      .subscribe(
        (moment: moment.Moment) => {
          this.newDate = moment.format('MMMM YYYY');
          if (this.newDate === this.currentDate) {
            this.mark = true;
            return;
          }
          this.mark = false;
        });

  }

  onOpenCalendarTile(day: number): void {
    // this.calendarService.getCurrentDate()
    //   .pipe(untilDestroyed(this))
    //   .subscribe(
    //     (currentDate: string) => {
    //       console.log(day, currentDate);
    //     }
    //   )
  }

  logout(): void {
    this.authService.logout();
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully logged out!'
      }
    );
  }
}

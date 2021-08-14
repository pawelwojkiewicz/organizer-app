import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { Task } from 'src/app/shared/types/task.type';
import { Observable } from 'rxjs';
import { CalendarService } from '../../calendar.service';
@Component({
  selector: 'app-calendar-tile',
  templateUrl: './calendar-tile.component.html',
  styleUrls: ['./calendar-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTileComponent implements OnInit {
  @Input() day: moment.Moment;
  newMonthTasks$ = this.calendarService.newMonthtasks$;
  array = [];

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private calendarService: CalendarService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.newMonthTask(this.day);
  }

  newMonthTask(day: moment.Moment) {
    this.newMonthTasks$.pipe(
      tap(
        el => {
          if (typeof el[day.format('D-MMMM-YYYY')] !== 'undefined') {
            this.array.push(el[day.format('D-MMMM-YYYY')]);
          } else {
            this.array.push([]);
          }
        }
      )
    )
      .subscribe(
        el => console.log(this.array)
      )
  }
}

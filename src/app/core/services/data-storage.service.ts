import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap, switchMap, finalize, takeUntil, take } from 'rxjs/operators'
import { User } from 'src/app/shared/models/user.model';
import { Task } from 'src/app/shared/types/task.type';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private calendarService: CalendarService,
    private authService: AuthService
  ) { }

  addTask(user: User, tasks: Task[]): Observable<Task[]> {
    return this.calendarService.openedDate$.pipe(
      switchMap(date => {
        return this.addTaskRequest(user, tasks, date);
      })
    );
  }

  addTaskRequest(user: User, tasks: Task[], date: moment.Moment): Observable<Task[]> {
    return this.http.put<Task[]>(
      `${environment.dataStorageUrl}/users/${user.id}/${date.format('D-MMMM-YYYY')}.json`, tasks
    );
  }

  getCurrentMonthTasks(): Observable<{}> {
    return this.authService.user$
      .pipe(
        switchMap(
          (user: User) => this.getCurrentMonthTasksRequest(user)
        )
      );
  }

  getCurrentMonthTasksRequest(user: User): Observable<{}> {
    return this.http.get(
      `${environment.dataStorageUrl}/users/${user.id}.json`
    );
  }

  getCurrentDayTasks(user: User): Observable<{}> {
    return this.calendarService.openedDate$.pipe(
      switchMap(
        (date: moment.Moment) => this.getCurrentDayTasksRequest(user, date)
      )
    );
  }

  getCurrentDayTasksRequest(user: User, date: moment.Moment): Observable<{}> {
    return this.http.get(
      `${environment.dataStorageUrl}/users/${user.id}/${date.format('D-MMMM-YYYY')}.json`
    );
  }


}

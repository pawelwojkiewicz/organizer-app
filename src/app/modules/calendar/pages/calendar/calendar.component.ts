import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { Observable, EMPTY } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private messageService: MessageService
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
  }

  addTask(user: User): void {
    this.dataStorageService
      .addTask(user, this.binding)
      .pipe(untilDestroyed(this))
      .subscribe();
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

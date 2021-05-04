import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { Observable } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  user$: Observable<User> = this.authService.user$;
  tasks$: Observable<any>;
  binding: string;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.user$
      .pipe(untilDestroyed(this))
      .subscribe(
        (user: User) => {
          if (!user) {
            return;
          }
          this.tasks$ = this.dataStorageService.getTasks(user);
        }
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
  }
}

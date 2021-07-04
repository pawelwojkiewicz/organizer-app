import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MomentService } from 'src/app/core/services/moment.service';
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
    private momentService: MomentService
  ) { }

  onPreviousMonth(): void {
    this.momentService.onPrevMonth();
    this.getCurrentDate();
  }

  onNextMonth(): void {
    this.momentService.onNextMonth();
    this.getCurrentDate();
  }

  getCurrentDate(): void {
    this.momentService.getCurrentDate()
      .pipe(untilDestroyed(this))
      .subscribe(
        (date: string) => {
          this.currentDate = date;
        }
      );
  }
}

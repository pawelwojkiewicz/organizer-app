import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Output() switchMonth = new EventEmitter<moment.Moment>();

  moment = moment();
  currentDate = this.moment.format('MMMM YYYY');

  constructor() { }

  onPreviousMonth(): void {
    this.currentDate = this.moment.subtract(1, 'M').format('MMMM YYYY');
    this.emitNewMonth();
  }

  onNextMonth(): void {
    this.currentDate = this.moment.add(1, 'M').format('MMMM YYYY');
    this.emitNewMonth();
  }

  emitNewMonth(): void {
    const newMonth = moment(this.currentDate);
    this.switchMonth.emit(newMonth);
  }
}

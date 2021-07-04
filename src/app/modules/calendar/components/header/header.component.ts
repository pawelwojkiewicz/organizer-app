import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output() setCurrentDate = new EventEmitter<moment.Moment>();

  moment = moment();
  currentDate = this.moment.format('MMMM YYYY');

  ngOnInit(): void {
    this.emitDate();
  }

  constructor() { }

  onPreviousMonth(): void {
    this.currentDate = this.moment.subtract(1, 'M').format('MMMM YYYY');
    this.emitDate();
  }

  onNextMonth(): void {
    this.currentDate = this.moment.add(1, 'M').format('MMMM YYYY');
    this.emitDate();
  }

  emitDate(): void {
    const currentDate = moment(this.currentDate);
    this.setCurrentDate.emit(currentDate);
  }
}

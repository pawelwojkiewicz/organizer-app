import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-calendar-tile',
  templateUrl: './calendar-tile.component.html',
  styleUrls: ['./calendar-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTileComponent {
  @Input() day: moment.Moment;
  constructor() { }
}

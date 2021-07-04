import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-tile',
  templateUrl: './calendar-tile.component.html',
  styleUrls: ['./calendar-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTileComponent implements OnInit {
  @Input() day: number;
  constructor() { }

  ngOnInit(): void {
  }

}

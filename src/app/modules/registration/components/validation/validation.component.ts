import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent {
  @Input() control: FormControl;
}

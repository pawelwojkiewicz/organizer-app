import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent implements OnInit {
  @Input() control: FormControl;
  constructor(private changeDetector: ChangeDetectorRef) { }

  controlSub: Subscription;

  ngOnInit(): void {
    this.controlSub = this.control.statusChanges.subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }
}

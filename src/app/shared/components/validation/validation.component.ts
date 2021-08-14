import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';

@UntilDestroy()

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent implements OnInit {

  @Input() control: FormControl;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.changeDetector.markForCheck();
      });
  }

}

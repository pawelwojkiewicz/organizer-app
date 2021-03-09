import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent implements OnInit, OnDestroy {

  @Input() control: FormControl;
  constructor(private changeDetector: ChangeDetectorRef) { }

  controlSub: Subscription;

  ngOnInit(): void {
    this.controlSub = this.control.statusChanges.subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.controlSub.unsubscribe();
  }
}

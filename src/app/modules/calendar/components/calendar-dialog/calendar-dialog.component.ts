import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Task } from 'src/app/shared/types/task.type';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDialogComponent implements OnInit {

  openDayDetails$ = this.calendarService.openDayDetails$;
  openedDate$ = this.calendarService.openedDate$;
  tasksForm: FormGroup;
  tasks: Task[] = [];
  getTaskSubscription: Subscription;
  addTaskSubscription: Subscription;

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initTasksForm();
  }

  get taskControls(): AbstractControl[] {
    return (this.tasksForm.get('tasks') as FormArray).controls;
  }

  initTasksForm(): void {
    this.tasksForm = this.formBuilder.group({
      tasks: this.formBuilder.array([])
    });
  }

  createTaskFormGroup(value: string): FormGroup {
    return new FormGroup({
      task: new FormControl(value),
    }
    );
  }

  addTaskFormGroup(value?: string): void {
    this.taskControls.push(this.createTaskFormGroup(value));
  }

  saveDayDetails(): void {
    this.tasks = [];
    this.taskControls.forEach(task => {
      this.tasks.push(task.value);
    });
    this.addTaskSubscription = this.authService.user$
      .pipe(
        switchMap(user => this.dataStorageService.addTask(user, this.tasks))
      ).subscribe(
        () => this.closeDayDetails()
      );
  }

  showDayDetails(): void {
    this.getTaskSubscription = this.authService.user$
      .pipe(
        switchMap(
          user => this.dataStorageService.getCurrentDayTasks(user)
        )
      ).subscribe(
        (tasks: Task[]) => {
          if (tasks) {
            tasks.forEach(task => {
              this.addTaskFormGroup(task.task);
            });
          }
          this.changeDetectorRef.detectChanges();
        }
      );
  }

  closeDayDetails(): void {
    const taskControlsArray = this.tasksForm.get('tasks') as FormArray;
    taskControlsArray.clear();
    this.calendarService.onOpenDayDetails(false);
    if (this.getTaskSubscription) {
      this.getTaskSubscription.unsubscribe();
    }
    if (this.addTaskSubscription) {
      this.addTaskSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidators } from 'ngx-validators';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  errorMessage: string;
  showDialog = false;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.registrationForm.valueChanges.pipe(debounceTime(300)).subscribe(
      () => {
        this.changeDetector.markForCheck();
      }
    );
  }

  initRegisterForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.email,
          Validators.required
        ]
      ),
      password: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ),
      repassword: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    }, PasswordValidators.mismatchedPasswords('password', 'repassword'),
    );
  }

  get regForm(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity();
      }
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value.email;
      const password = this.registrationForm.value.password;
      this.authService.register(email, password)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.showDialog = true;
          this.changeDetector.detectChanges();
        }, errorStatus => {
          this.regForm.email.setErrors(errorStatus);
        });
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }
}

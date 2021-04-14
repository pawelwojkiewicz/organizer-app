import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.email,
          Validators.required
        ]
      ),
      password: new FormControl(
        null,
        Validators.required
      ),
    }
    );
  }

  get logForm(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
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

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password)
        .pipe(untilDestroyed(this))
        .subscribe(data => {
          console.log(data);
        }, errorStatus => {
          switch (errorStatus) {
            case 'EMAIL_NOT_FOUND':
              this.logForm.email.setErrors({ emailNotFound: true });
              break;
            case 'INVALID_PASSWORD':
              this.logForm.password.setErrors({ invalidPassword: true });
              break;
            default:
              this.logForm.email.setErrors({ unknownError: true });
              break;
          }
        });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }
}

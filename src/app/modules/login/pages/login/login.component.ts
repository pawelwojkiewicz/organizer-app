import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { routePath } from 'src/app/core/constans/route.path';
import { MessageService } from 'primeng/api';
import { TouchedFormControlsService } from 'src/app/core/services/touched-form-controls.service';


@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  calendarRoute = ['/', routePath.calendar];

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private touchedFormControl: TouchedFormControlsService
  ) { }

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

  get logForm(): {
    [key: string]: AbstractControl
  } {
    return this.loginForm.controls;
  }



  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.router.navigate((this.calendarRoute));
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'You have successfully logged in!'
            }
          );
        }
          , errorStatus => {
            switch (errorStatus) {
              case 'EMAIL_NOT_FOUND':
                this.logForm.email.setErrors({ emailNotFound: true });
                break;
              case 'INVALID_PASSWORD':
                this.logForm.password.setErrors({ invalidPassword: true });
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
                this.logForm.email.setErrors({ tooManyAttempts: true });
                break;
              default:
                this.logForm.email.setErrors({ unknownError: true });
                break;
            }
          }
        );
    } else {
      this.touchedFormControl.validateAllFormFields(this.loginForm);
    }
  }
}

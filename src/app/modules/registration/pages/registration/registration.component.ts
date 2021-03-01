import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'ngx-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(4)
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
          Validators.required,
          Validators.minLength(8),
        ]
      )
    }, PasswordValidators.mismatchedPasswords('password', 'repassword')
    );
  }

  get regForm(): { [key: string]: any } | null {
    return this.registrationForm.controls;
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/shared/components/validators/confirm-password-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
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
        ]
      ),
      repassword: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ),
    }, { validators: ConfirmPasswordValidator }
    );
  }
  get regForm(): { [key: string]: any } | null {
    return this.registrationForm.controls;
  }
  onRegister(): void {
    this.submitted = true;
    console.log(this.registrationForm);
    if (this.registrationForm.invalid) {
      return;
    }
  }


}

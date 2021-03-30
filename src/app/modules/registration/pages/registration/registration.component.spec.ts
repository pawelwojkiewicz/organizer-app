import { RegistrationComponent } from './registration.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, AbstractControl } from '@angular/forms';

describe('RegistrationComponent', () => {
  let spectator: Spectator<RegistrationComponent>;
  let form: FormGroup;
  let control: { [key: string]: AbstractControl; };

  const createComponent = createComponentFactory({
    component: RegistrationComponent,
    imports: [HttpClientTestingModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    form = spectator.component.registrationForm;
    control = spectator.component.registrationForm.controls;
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('it should has email input', () => {
    const emailInput = spectator.query('input[type="email"]');
    expect(emailInput).toHaveAttribute('pInputText');
    expect(emailInput).toHaveAttribute('placeholder', 'email');
  });

  it('it should has password and confirm password inputs', () => {
    const passwordInputs = spectator.queryAll('input[type="password"]');
    expect(passwordInputs[0]).toHaveAttribute('placeholder', 'password');
    expect(passwordInputs[1]).toHaveAttribute('placeholder', 'repeat password');
    expect(passwordInputs).toHaveAttribute('pPassword');
  });

  it('form invalid when inputs are empty', () => {
    expect(form.valid).toBeFalsy();
    expect(control.email.valid).toBeFalsy();
    expect(control.password.valid).toBeFalsy();
    expect(control.repassword.valid).toBeFalsy();
    expect(control.email.errors.required).toBeTruthy();
    expect(control.password.errors.required).toBeTruthy();
    expect(control.repassword.errors.required).toBeTruthy();
  });

  it('email pattern validity when type "test"', () => {
    let errors = {};
    control.email.setValue('test');
    errors = control.email.errors || {};
    expect(errors['email']).toBeTruthy();
    expect(control.email.valid).toBeFalsy();
  });

  it('minlength of password validty', () => {
    let errors = {};
    control.password.setValue('test123');
    errors = control.password.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(control.password.valid).toBeFalsy();
  });

  it('mismatched passwords validity', () => {
    let errors = {};
    control.password.setValue('test1234');
    control.repassword.setValue('test123');
    errors = form.errors || {};
    expect(errors['mismatchedPasswords']).toBeTruthy();
  });
});

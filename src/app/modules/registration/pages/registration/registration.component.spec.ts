import { RegistrationComponent } from './registration.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationComponent', () => {
  let spectator: Spectator<RegistrationComponent>;
  const createComponent = createComponentFactory({
    component: RegistrationComponent,
    imports: [HttpClientTestingModule]
  });

  beforeEach(() => spectator = createComponent());

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

  //Empty form

  // it('form invalid when inputs are empty', () => {
  //   const email = spectator.component.registrationForm.controls.email;
  //   const password = spectator.component.registrationForm.controls.password;
  //   const confirmPassword = spectator.component.registrationForm.controls.repassword;
  //   expect(spectator.component.registrationForm.valid).toBeFalsy();
  //   expect(email.valid).toBeFalsy();
  //   expect(password.valid).toBeFalsy();
  //   expect(confirmPassword.valid).toBeFalsy();
  //   expect(email.errors.required).toBeTruthy();
  //   expect(password.errors.required).toBeTruthy();
  //   expect(confirmPassword.errors.required).toBeTruthy();
  // });

  //Form errors
  // it('email pattern validity when type "test"', () => {
  //   let errors = {};
  //   const email = spectator.component.registrationForm.controls.email;
  //   email.setValue('test');
  //   errors = email.errors || {};
  //   expect(errors['email']).toBeTruthy();
  //   expect(email.valid).toBeFalsy();
  // });

  // it('minlength of password validty', () => {
  //   let errors = {};
  //   const password = spectator.component.registrationForm.controls.password;
  //   password.setValue('test123');
  //   errors = password.errors || {};
  //   expect(errors['minlength']).toBeTruthy();
  //   expect(password.valid).toBeFalsy();
  // });

  // it('mismatched passwords validity', () => {
  //   let errors = {};
  //   const form = spectator.component.registrationForm;
  //   const password = spectator.component.registrationForm.controls.password;
  //   const confirmPassword = spectator.component.registrationForm.controls.repassword;
  //   password.setValue('test1234');
  //   confirmPassword.setValue('test123');
  //   errors = form.errors || {};
  //   expect(errors['mismatchedPasswords']).toBeTruthy();
  // });
});

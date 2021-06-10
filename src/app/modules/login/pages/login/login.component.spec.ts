import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, AbstractControl } from '@angular/forms';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  let form: FormGroup;
  let control: { [key: string]: AbstractControl; };
  const createComponent = createComponentFactory({
    component: LoginComponent,
    imports: [HttpClientTestingModule],
  });

  describe('LoginComponentInputs', () => {

    beforeAll(() => spectator = createComponent());

    it('should create', () => {
      // assert
      expect(spectator).toBeTruthy();
    });

    it('it should has email input', () => {
      // arrange
      const emailInput = spectator.query('input[type="email"]');

      // assert
      expect(emailInput).toHaveAttribute('pInputText');
      expect(emailInput).toHaveAttribute('placeholder', 'email');
    });

    it('it should has password input', () => {
      // arrange
      const passwordInput = spectator.query('input[type="password"]');

      // assert
      expect(passwordInput).toHaveAttribute('placeholder', 'password');
      expect(passwordInput).toHaveAttribute('pPassword');
    });
  });

  describe('LoginComponentInputsValidation', () => {

    beforeEach(() => {
      spectator = createComponent();
      form = spectator.component.loginForm;
      control = spectator.component.loginForm.controls;
    });

    it('form invalid when inputs are empty', () => {
      // assert
      expect(form.valid).toBeFalsy();
      expect(control.email.valid).toBeFalsy();
      expect(control.password.valid).toBeFalsy();
      expect(control.email.errors.required).toBeTruthy();
      expect(control.password.errors.required).toBeTruthy();
    });

    it('email pattern validity when type "test"', () => {
      // arrange
      let errors = {};

      // act
      control.email.setValue('test');
      errors = control.email.errors || {};

      // assert
      expect(errors['email']).toBeTruthy();
      expect(control.email.valid).toBeFalsy();
    });
  });
});

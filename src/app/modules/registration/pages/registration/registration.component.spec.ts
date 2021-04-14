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

  describe('RegistrationComponentInputs', () => {

    beforeAll(() => {
      spectator = createComponent();
    });

    it('should create', () => {
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
      const passwordInputs = spectator.queryAll('input[type="password"]');

      // assert
      expect(passwordInputs[0]).toHaveAttribute('placeholder', 'password');
      expect(passwordInputs[0]).toHaveAttribute('pPassword');
    });

    it('it should has confirm password input', () => {
      // arrange
      const passwordInputs = spectator.queryAll('input[type="password"]');

      // assert
      expect(passwordInputs[1]).toHaveAttribute('placeholder', 'repeat password');
      expect(passwordInputs[1]).toHaveAttribute('pPassword');
    });
  });

  beforeEach(() => {
    spectator = createComponent();
    form = spectator.component.registrationForm;
    control = spectator.component.registrationForm.controls;
  });

  it('form invalid when inputs are empty', () => {
    // assert
    expect(form.valid).toBeFalsy();
    expect(control.email.valid).toBeFalsy();
    expect(control.password.valid).toBeFalsy();
    expect(control.repassword.valid).toBeFalsy();
    expect(control.email.errors.required).toBeTruthy();
    expect(control.password.errors.required).toBeTruthy();
    expect(control.repassword.errors.required).toBeTruthy();
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

  it('minlength of password validty', () => {
    // arrange
    let errors = {};

    // act
    control.password.setValue('test123');
    errors = control.password.errors || {};

    // assert
    expect(errors['minlength']).toBeTruthy();
    expect(control.password.valid).toBeFalsy();
  });

  it('mismatched passwords validity', () => {
    // arrange
    let errors = {};

    // act
    control.password.setValue('test1234');
    control.repassword.setValue('test123');
    errors = form.errors || {};

    // assert
    expect(errors['mismatchedPasswords']).toBeTruthy();
  });
});

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ValidationComponent } from './validation.component';
import { ControlContainer, FormControl, Validators, FormGroup } from '@angular/forms';
import { PasswordValidators } from 'ngx-validators';

describe('RegistrationComponent', () => {
  let spectator: Spectator<ValidationComponent>;

  const createComponent = createComponentFactory({
    component: ValidationComponent
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        control: new FormControl()
      },
    });
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('"test@gmail.com" should be email', () => {
    // arrange
    const control = new FormControl('test@gmail.com', [Validators.required, Validators.email]);

    // assert
    expect(control.errors).toBeNull();
  });

  it('"test@xxx" should not be email', () => {
    // arrange
    const control = new FormControl('test', Validators.email);

    // assert
    expect(control.errors).toEqual({ email: true });
  });

  it('empty input should be required', () => {
    // arrange
    const control = new FormControl(null, Validators.required);

    // assert
    expect(control.errors).toEqual({ required: true });
  });
});

it('password should has 8 characters', () => {
  // arrange
  const control = new FormControl('test', Validators.minLength(8));

  // assert
  expect(control.errors.minlength).toEqual({
    actualLength: 4,
    requiredLength: 8
  });
});

it('password and repassword must be the same', () => {
  // arrange
  const form = new FormGroup({
    password: new FormControl('test1234'),
    repassword: new FormControl('testtest')
  }, PasswordValidators.mismatchedPasswords('password', 'repassword'),
  );

  // assert
  expect(form.errors.mismatchedPasswords).toBeTruthy();
});


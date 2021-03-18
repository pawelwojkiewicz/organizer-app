import { RegistrationComponent } from './registration.component';
import { HttpClientModule } from '@angular/common/http';

import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('RegistrationComponent', () => {
  let spectator: Spectator<RegistrationComponent>;
  const createComponent = createComponentFactory({
    component: RegistrationComponent,
    imports: [HttpClientModule]
  });

  beforeEach(() => spectator = createComponent({
  }));

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

  it('form invalid when empty', () => {
    expect(spectator.component.registrationForm.valid).toBeFalsy();
  });
  it('email field invalid when empty', () => {
    const email = spectator.component.registrationForm.controls.email;
    expect(email.valid).toBeFalsy();
  });
  it('password field invalid when empty', () => {
    const password = spectator.component.registrationForm.controls.password;
    expect(password.valid).toBeFalsy();
  });
  it('confirm password field invalid when empty', () => {
    const confirmPassword = spectator.component.registrationForm.controls.repassword;
    expect(confirmPassword.valid).toBeFalsy();
  });
});

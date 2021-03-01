import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const ConfirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');
  return password && repassword && password.value === repassword.value ? { confirmedPassword: true } : null;
};

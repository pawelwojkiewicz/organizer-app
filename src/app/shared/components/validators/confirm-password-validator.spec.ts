import { confirmPasswordValidator } from './confirm-password-validator';

describe('confirmPasswordValidator', () => {
  it('should create an instance', () => {
    const directive = new confirmPasswordValidator();
    expect(directive).toBeTruthy();
  });
});

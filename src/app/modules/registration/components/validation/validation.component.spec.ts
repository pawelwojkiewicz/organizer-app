import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ValidationComponent } from './validation.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RegistrationComponent } from '../../pages/registration/registration.component';

describe('ValidationComponent', () => {
  let spectator: Spectator<ValidationComponent>;
  const createComponent = createComponentFactory({
    component: ValidationComponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    const formControl: FormControl = new FormControl();
    spectator = createComponent({
      props: {
        control: formControl
      },
    });
    // ngOnInit?
    spectator.component.ngOnInit();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('form invalid when inputs are empty', () => {
    console.log('spec', spectator.component.control);
    const control = spectator.component.control;
    expect(control.errors.required).toBeTruthy();
  });
});

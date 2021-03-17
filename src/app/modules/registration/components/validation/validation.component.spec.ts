import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationComponent } from './validation.component';
import { FormControl } from '@angular/forms';

describe('ValidationComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    const control: FormControl = new FormControl();
    component.control = control;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TouchedFormControlsService } from './touched-form-controls.service';

describe('TouchedFormControlsService', () => {
  let service: TouchedFormControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchedFormControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

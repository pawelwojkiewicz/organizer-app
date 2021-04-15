import { createRoutingFactory } from '@ngneat/spectator';

import { LoginComponent } from './login.component';
import { RegistrationComponent } from 'src/app/modules/registration/pages/registration/registration.component';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponentRouting', () => {
  const createComponent = createRoutingFactory({
    component: LoginComponent,
    imports: [HttpClientTestingModule],
    declarations: [RegistrationComponent],
    stubsEnabled: false,
    routes: [
      {
        path: 'registration',
        component: RegistrationComponent
      }
    ]
  });

  it('should navigate to registration after click to "Register" link', async () => {
    const spectator = createComponent();

    // wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the current route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/');

    // click on a router link
    spectator.click('.link');

    // don't forget to wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the new route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/registration');
  });
});



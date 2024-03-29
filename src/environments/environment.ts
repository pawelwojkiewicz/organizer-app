// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  registerApiUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBl7PiYrxj5G_O4PhMaGjGoC3n8-U1VvWk',
  loginApiUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBl7PiYrxj5G_O4PhMaGjGoC3n8-U1VvWk',
  dataStorageUrl: 'https://organizer-app-29a22-default-rtdb.firebaseio.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

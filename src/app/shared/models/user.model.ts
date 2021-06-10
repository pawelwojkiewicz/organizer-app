export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  // Getter is special property where we can set additional condition to use that property.
  // to get access to token and tokenExpirationDate first condition must be checked by getter.
  // We can't overwrite this property
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

export interface ValidatorPasswordsInterface {
  validatePassword: (
    passwordInterno: string,
    passwordExterno: string,
    email: string,
  ) => Promise<void>;
}

export interface CryptoPassordUsuariosInterface {
  cryptoPassword: (value: string) => Promise<string>;
  comparePassword: (
    passwordInterno: string,
    passwordExterno: string,
  ) => Promise<boolean>;
}

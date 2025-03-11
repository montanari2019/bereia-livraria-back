export interface CryptoPassordUsuariosInterface {
  cryptoPassword: (value: string) => Promise<string>;
}

export interface FindPasswordUserInterface {
  findPasswordUser: (email: string) => Promise<string>;
}

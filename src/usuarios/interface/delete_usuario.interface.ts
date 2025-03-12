export interface DeleteUsuarioInterface {
  deleteUser: (id_user: string) => Promise<{
    mensage: string;
  }>;
}

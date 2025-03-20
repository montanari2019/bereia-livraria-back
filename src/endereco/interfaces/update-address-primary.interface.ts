export interface UpdatePrimaryAddressInterface {
  updatePrimaryAddress: (id_endereco: string) => Promise<{ message: string }>;
}

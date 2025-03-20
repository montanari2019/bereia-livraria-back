export interface UpdatePrimaryAddressInterface {
  updatePrimaryAddress: (
    id_endereco: string,
    user_id: string,
  ) => Promise<{ message: string }>;
}

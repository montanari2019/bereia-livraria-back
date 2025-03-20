export interface RepositoryPrimaryAddressInterface {
  searchPrimaryAddress(id_user: string): Promise<{
    id: string;
    address: string;
  } | null>;
}

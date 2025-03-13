export interface UpdateTentativasLogin {
  updateTentativas: (email: string) => Promise<void>;
  resetTentativas: (email: string) => Promise<void>;
}

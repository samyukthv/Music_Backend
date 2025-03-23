export interface payload {
  email: string;
  id: number;
  artistId?: number;
}

export type Enable2FAType = {
  secret: string;
};

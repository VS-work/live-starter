export interface Statistics {
  id: string;
  likes?: number;
  followers?: number;
}

export interface LikeRequestObj {
  likee: string;
  liker: string;
}

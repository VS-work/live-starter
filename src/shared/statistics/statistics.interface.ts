export interface Statistics {
  likes?: number;
  followers?: number;
  viewers?: number;
  shows?: number;
}

export interface LikeRequestObj {
  likee: string;
  liker: string;
}

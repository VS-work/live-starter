export interface FollowRqstObj {
  follower: string;
  following: string;
}

export interface FollowResponse {
  isFollowed: boolean;
  message?: string;
}

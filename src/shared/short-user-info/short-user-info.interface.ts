export interface ShortUserInfo {
  avatar: string;
  username: string;
  userProfileLink?: {
    routerLink: string;
    queryParams: {
      id: string
    }
  };
  showLocation?: string;
  location?: string;
  type?: string;
  date?: string;
  amountTip?: string;
  _id?: string;
}

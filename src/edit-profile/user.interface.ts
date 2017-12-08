export interface User {
  _id: string,
  email: string,
  name: string,
  given_name: string,
  family_name: string,
  picture: string
  locale: string,
  nickname: string,
  country: string,
  email_verified: boolean,
  clientID: string,
  updated_at: string,
  user_id: string,
  identities: [
    {
      provider: string,
      user_id: string,
      connection: string,
      isSocial: boolean
    }
  ],
  created_at: string,
  global_client_id: string
}


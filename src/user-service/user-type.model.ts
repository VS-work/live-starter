export interface UserType {
  type: string;
  title: string;
  description: string;
}

export const USER_TYPES: UserType[] = [
  {
    type: 'fan',
    title: `I'm a Fan`,
    description: 'Fan is fun.'
  },
  {
    type: 'artist',
    title: `I'm an Artist`,
    description: 'Artist is a man who plays music.'
  }
];

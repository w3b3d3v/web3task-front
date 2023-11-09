export enum UserRole {
  Admin = 0,
  Leader = 5,
  Member = 10
}


export interface User {
  name: string;
  coverImg: string;
  avatar: string;
  description: string;
  jobTitle: string;
  location: string;
  social: string;
}

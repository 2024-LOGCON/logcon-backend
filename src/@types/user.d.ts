declare global {
  namespace Express {
    export interface User extends ExtendUser {}
  }
}

export interface ExtendUser {
  name: string;
  email: string;
  id: string;
  school: string;
}

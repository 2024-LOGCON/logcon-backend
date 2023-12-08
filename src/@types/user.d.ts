import { User as ExtendUser } from 'src/shared/entities';

declare global {
  namespace Express {
    export interface User extends ExtendUser {}
  }
}

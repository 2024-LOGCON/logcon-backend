import { Category } from './category.entity';
import { Challenge } from './challenge.entity';
import { Notice } from './notice.entity';
import { Solve } from './solve.entity';
import { User } from './user.entity';
import { Docker } from './docker.entity';

export * from './category.entity';
export * from './challenge.entity';
export * from './notice.entity';
export * from './solve.entity';
export * from './user.entity';
export * from './docker.entity';

export default [Challenge, Category, Notice, Solve, User, Docker];

import {
  Model,
  Table,
  Column,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { Todo } from 'src/todos/entities/todo.entity';

@Table({ paranoid: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];
}

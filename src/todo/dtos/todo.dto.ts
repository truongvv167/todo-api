import { MinLength } from 'class-validator';

export class CreateTodo {
  @MinLength(6)
  title: string;
}

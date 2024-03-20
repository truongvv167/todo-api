import { IsBoolean } from 'class-validator';
import { CreateTodo } from './todo.dto';

export class UpdateTodo extends CreateTodo {
  @IsBoolean()
  completed: boolean;
}

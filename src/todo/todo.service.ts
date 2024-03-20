import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTodo } from './dtos/todo.dto';
import { UpdateTodo } from './dtos/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(private primaService: PrismaService) {}

  async getAllTodo() {
    const todos = await this.primaService.todo.findMany();
    return todos;
  }

  async getTodo(id: string) {
    const todo = await this.primaService.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return todo;
  }

  async createTodo(todoData: CreateTodo): Promise<string> {
    const todo = await this.primaService.todo.findUnique({
      where: {
        title: todoData.title,
      },
    });

    if (todo) {
      throw new HttpException(
        {
          message: 'This title has been taken',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.primaService.todo.create({
      data: {
        ...todoData,
      },
    });

    return res.id;
  }

  async updateTodo(id: string, todo: UpdateTodo) {
    const todoById = await this.primaService.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todoById) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.primaService.todo.update({
      where: {
        id: id,
      },
      data: {
        ...todo,
      },
    });

    return { message: 'Update Successfully' };
  }

  async deleteTodo(id: string) {
    const todo = await this.primaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleteTodo = await this.primaService.todo.delete({
      where: {
        id,
      },
    });

    return deleteTodo.id;
  }
}

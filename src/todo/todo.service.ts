import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException();
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
      throw new NotFoundException();
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
      throw new NotFoundException();
    }

    const updateTodo = await this.primaService.todo.update({
      where: {
        id: id,
      },
      data: {
        ...todo,
      },
    });

    return updateTodo.id;
  }

  async deleteTodo(id: string) {
    const todo = await this.primaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException();
    }

    await this.primaService.todo.delete({
      where: {
        id,
      },
    });

    return { message: 'Delete Successfully' };
  }
}

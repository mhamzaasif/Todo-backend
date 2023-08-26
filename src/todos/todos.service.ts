import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const todo = await Todo.create({
      ...createTodoDto,
      user_id: user.id,
      due_date: createTodoDto.dueDate,
    });
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await Todo.findAll();
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await Todo.findByPk(id);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const [, todos] = await Todo.update(
      { ...updateTodoDto },
      { where: { id }, returning: true },
    );
    return todos[0];
  }

  async remove(id: number | number[]): Promise<boolean> {
    const count = await Todo.destroy({ where: { id } });
    return !!count;
  }
}

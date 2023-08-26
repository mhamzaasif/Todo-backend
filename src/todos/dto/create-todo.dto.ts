import { IsDateString, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsEnum({ HIGH: 'HIGH', MEDIUM: 'MEDIUM', LOW: 'LOW' })
  priority: string;
}

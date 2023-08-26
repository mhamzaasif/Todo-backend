import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(0, 30)
  name: string;

  @IsString()
  @Length(8)
  password: string;
}

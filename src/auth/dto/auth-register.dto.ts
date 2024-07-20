import { IsString, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;
}

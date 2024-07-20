import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IsPublic } from "src/decorators/is-public.decorator";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @IsPublic()
  async register(@Body() body: AuthRegisterDto): Promise<string> {
    return this.authService.register(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async login(@Body() body: AuthLoginDto): Promise<string> {
    return this.authService.login(body);
  }
}

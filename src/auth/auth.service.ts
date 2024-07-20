import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "../jwt/jwt.service";

import { AuthRegisterDto } from "./dto/auth-register.dto";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { HashService } from "src/hash/hash.service";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<string> {
    const userExists = await this.usersRepository.existsBy({
      username: authRegisterDto.username,
    });

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const passwordHash = await this.hashService.hash(authRegisterDto.password);

    const user = this.usersRepository.create({
      username: authRegisterDto.username,
      password: passwordHash,
    });

    await this.usersRepository.save(user);

    return await this.jwtService.sign({ sub: user.id.toString() });
  }

  // o retorno é o token, que é uma string
  async login(authLoginDto: AuthLoginDto): Promise<string> {
    const user = await this.usersRepository.findOne({
      // antes era email
      where: { username: authLoginDto.username },
    });

    if (!user) {
      throw new BadRequestException("Email or password invalid");
    }

    const isMatch = await this.hashService.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException("Email or password invalid");
    }

    return await this.jwtService.sign({ sub: user.id.toString() });
  }
}

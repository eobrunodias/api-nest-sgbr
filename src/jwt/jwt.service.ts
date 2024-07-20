import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";

type JwtOptions<T extends object | Buffer> = {
  iat?: number;
  exp?: string | number;
  iss?: string;
  sub?: string;
} & { payload?: T };

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async sign<T extends object | Buffer>(
    options: Omit<JwtOptions<T>, "iat"> = {},
  ): Promise<string> {
    return this.jwtService.sign(options.payload ?? {}, {
      issuer: options.iss,
      subject: options.sub,
      expiresIn: options.exp,
    });
  }

  async verify<T extends object>(token: string): Promise<JwtOptions<T>> {
    return this.jwtService.verify<T>(token);
  }
}

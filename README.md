api/
├── src/
│ ├── @types/
│ │ └── express.d.ts
│ ├── auth/
│ │ ├── dto/
│ │ │ ├── auth-login.dto.ts
│ │ │ └── auth-register.dto.ts
│ │ ├── auth.controller.ts
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ └── jwt.strategy.ts
│ ├── decorators/
│ │ └── is-public.decorator
│ ├── guards/
│ │ └── auth.guard
│ ├── hash/
│ │ ├── hash.module.ts
│ │ └── hash.service.ts
│ ├── jwt/
│ │ ├── jwt.module.ts
│ │ └── jwt.service.ts
│ ├── places/
│ │ ├── dto/
│ │ │ ├── create-place.dto.ts
│ │ │ └── update-place.dto.ts
│ │ ├── entities/
│ │ │ └── place.entity.ts
│ │ ├── places.controller.ts
│ │ ├── places.module.ts
│ │ └── places.service.ts
│ ├── users/
│ │ ├── dto/
│ │ │ ├── create-user.dto.ts
│ │ │ └── login-user.dto.ts
│ │ ├── entities/
│ │ │ └── user.entity.ts
│ │ ├── users.controller.ts
│ │ ├── users.module.ts
│ │ └── users.service.ts
│ ├── app.module.ts
│ └── main.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.build.json
├── tsconfig.json
└── README.md

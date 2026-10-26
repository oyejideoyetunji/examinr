import { CreateUserUseCase, GetUsersUseCase } from "./application";
import type { UserRepository } from "./domain";
import { UserController } from "./presentation/user.controller";
import { userRoutes } from "./presentation/user.routes";

export function createUserModule(repo: UserRepository) {
    const controller = new UserController({
        createUser: new CreateUserUseCase(repo),
        getUsers: new GetUsersUseCase(repo),
    });

    return userRoutes(controller);
}

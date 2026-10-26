import type { Request, Response } from "express"
import type { CreateUserUseCase, GetUsersUseCase } from "../application";

interface UserUseCases {
    createUser: CreateUserUseCase;
    getUsers: GetUsersUseCase;
}

export class UserController {
    constructor(private readonly useCaeses: UserUseCases) {}

    create = async (req: Request, res: Response) => {
        const user = await this.useCaeses.createUser.execute(req.body);

        if (!user) {
            throw new Error(`Failed to create user for the given payload: ${JSON.stringify(req.body)}`);
        }

        res.status(201).send(user);
    }

    getAll = async (req: Request, res: Response) => {
        const users = await this.useCaeses.getUsers.execute();

        res.status(200).send(users);
    }
}

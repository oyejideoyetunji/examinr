import type { NewUserPayload } from "../../../shared";
import type { UserRepository } from "../domain";

export class CreateUserUseCase {
    constructor(private readonly users: UserRepository) {}

    execute = async (data: NewUserPayload) => {
        if (await this.users.findByEmail(data.email)) {
            throw new Error("Email already in use")
        }

        return await this.users.save(data);
    }
}

import type { RegisterUserPayload } from "../domain/entities";
import type { UserGateWay } from "../domain/gate-ways";
import type { PasswordHasher } from "../domain/ports";

export class RegisterUserUseCase {
    constructor (
        private readonly users: UserGateWay,
        private readonly passwordHasher: PasswordHasher
    ) {}

    execute = async (data: RegisterUserPayload) => {
        const hashedPassword = await this.passwordHasher.hash(data.password);

        return await this.users.createUser({ email: data.email, username: data.username, hashedPassword });
    }
}

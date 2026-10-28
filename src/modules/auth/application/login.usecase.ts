import { Unauthorized } from "../../../shared/error";
import type { LoginPayload } from "../domain/entities";
import type { UserGateWay } from "../domain/gate-ways";
import type { PasswordHasher, TokenIssuer } from "../domain/ports";

export class LoginUseCase {
    constructor (
        private readonly users: UserGateWay,
        private readonly tokenIssuer: TokenIssuer,
        private readonly passwordHasher: PasswordHasher,
    ){}

    execute = async (payload: LoginPayload) => {
        const userAuth = await this.users.getUserAuth(payload.email);

        const isValid = await this.passwordHasher.verify(userAuth.hashedPassword, payload.password);

        if (!isValid) {
            throw new Unauthorized();
        }

        const jwt = this.tokenIssuer.issueFor({ userId: userAuth.id, email: userAuth.email});

        return jwt;
    }
}

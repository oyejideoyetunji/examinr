import z from "zod";
import { config } from "../../../../shared/config";
import type { TokenIssuer, UserJwtParams } from "../../domain/ports";
import Jwt from "jsonwebtoken";

const schema = z.object({
    userId: z.string(),
    email: z.email()
})

export class TokenIssuerPort implements TokenIssuer {
    issueFor = (params: UserJwtParams) => {
        return makeJWT(params, 60*60, config.api.jwtSecrete)
    }

    verify = (token: string) => {
        const payload = validateJWT(token, config.api.jwtSecrete);

        try {
            const parsed = schema.parse(payload);
            return parsed;
        } catch (error) {
            throw error;
        }
    }
}

function makeJWT(params: Record<string, any>, expiresIn: number, secrete: string) {
    return Jwt.sign(params, secrete, { expiresIn });
}

function validateJWT(tokenString: string, secret: string) {
    return Jwt.verify(tokenString, secret);
}

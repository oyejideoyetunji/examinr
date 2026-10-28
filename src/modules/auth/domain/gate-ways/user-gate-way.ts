import type { NewUserPayload, User, UserResponse } from "../../../../shared/types";

export interface UserGateWay {
    createUser: (payload: NewUserPayload) => Promise<UserResponse>;
    getUserAuth: (email: string) => Promise<User>;
}

import type { NewUserPayload, User, UserResponse } from "../../../shared";

export interface UserRepository {
    save(user: NewUserPayload): Promise<UserResponse | undefined>;
    getAll(): Promise<UserResponse[]>;
    findById(id: string): Promise<UserResponse | undefined>;
    findByEmail(email: string): Promise<UserResponse | undefined>;
    update(id: string, newData: Partial<User>): Promise<UserResponse | undefined>;
}

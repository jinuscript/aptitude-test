export interface User {
    id: number;
    user_id: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
}
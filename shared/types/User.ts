export interface User {
    id: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
}
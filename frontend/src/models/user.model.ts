export interface User {
    _id : string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateUserPayload {
    _id: string;
    name?: string;
    email?: string;
    role?: "user" | "admin";
}
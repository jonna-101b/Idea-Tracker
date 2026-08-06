export interface Payload {
    _id: string;
    role: "user" | "admin";
}
export declare const createToken: (payload: Payload) => string;
export declare const hashPassword: (password: string, salt: number) => Promise<string>;
//# sourceMappingURL=auth.d.ts.map